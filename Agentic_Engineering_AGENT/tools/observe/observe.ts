#!/usr/bin/env bun
/**
 * Reference implementation of `primitives/observation.md`.
 *
 * One adopter's answer, in one language. The blueprint is the portable part -- if this
 * file and the primitive disagree, the primitive is right and this is behind.
 *
 * Writes compact JSONL. Off unless opened; the open and close are what bound the cost.
 */

const SCHEMA_VERSION = 1;

const KINDS = ['command', 'ui', 'handoff', 'prompt', 'decision', 'gap', 'meta_change'] as const;
const CLOSE_REASONS = ['completed', 'abandoned', 'interrupted'] as const;
const EFFECTS = ['read', 'write'] as const;

type Kind = (typeof KINDS)[number];
type CloseReason = (typeof CLOSE_REASONS)[number];
type Effect = (typeof EFFECTS)[number];

const root = (): string => process.env.OBSERVE_DIR ?? `${process.cwd()}/observations`;
const dirFor = (obsId: string): string => `${root()}/${obsId}`;
const recordPath = (obsId: string): string => `${dirFor(obsId)}/observation.jsonl`;

/**
 * Identity is `<subject>_<id>`. The subject makes a recording findable by the ticket it belongs
 * to; the id keeps two agents working the SAME ticket from writing into one file. There is no
 * global "currently open" pointer -- openness is derived by reading each record for a close
 * event, so two recordings can be open at once and neither can corrupt the other's state.
 */
const slug = (s: string): string => s.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');

const isKind = (v: string): v is Kind => (KINDS as readonly string[]).includes(v);
const isCloseReason = (v: string): v is CloseReason => (CLOSE_REASONS as readonly string[]).includes(v);
const isEffect = (v: string): v is Effect => (EFFECTS as readonly string[]).includes(v);

const now = (): string => new Date().toISOString();

const refuse = (message: string): never => {
    console.error(`observe: ${message}`);
    process.exit(1);
};

/** Flags only; a positional would be ambiguous against free text in `--what`. */
const parseFlags = (argv: string[]): Record<string, string | true> =>
    argv.reduce<Record<string, string | true>>((acc, token, i) => {
        if (!token.startsWith('--')) return acc;
        const next = argv[i + 1];
        acc[token.slice(2)] = next && !next.startsWith('--') ? next : true;
        return acc;
    }, {});

const isClosed = async (obsId: string): Promise<boolean> =>
    (await lines(obsId)).some((l) => l.event === 'close');

const listObservations = async (): Promise<string[]> => {
    const glob = new Bun.Glob('*/observation.jsonl');
    const found: string[] = [];
    for await (const hit of glob.scan({ cwd: root() })) found.push(hit.split('/')[0]);
    return found.sort();
};

const listOpen = async (): Promise<string[]> => {
    const all = await listObservations();
    const open: string[] = [];
    for (const id of all) if (!(await isClosed(id))) open.push(id);
    return open;
};

/**
 * `--obs` is optional while exactly one recording is open, and required once more than one is.
 * Guessing between two open recordings is the collision this exists to prevent.
 */
const resolveOpen = async (flags: Record<string, string | true>): Promise<string> => {
    const named = typeof flags.obs === 'string' ? flags.obs : null;
    if (named) {
        if (!(await Bun.file(recordPath(named)).exists())) refuse(`no recording named ${named}.`);
        if (await isClosed(named)) refuse(`${named} is already closed.`);
        return named;
    }
    const open = await listOpen();
    if (open.length === 0) refuse('no recording is open. `observe open --subject <ticket>` first.');
    if (open.length > 1) refuse(`${open.length} recordings are open — name one with --obs:\n  ${open.join('\n  ')}`);
    return open[0]!;
};

const append = async (obsId: string, entry: Record<string, unknown>): Promise<void> => {
    const line = `${JSON.stringify({ schema_version: SCHEMA_VERSION, obs_id: obsId, ...entry })}\n`;
    const path = recordPath(obsId);
    const existing = (await Bun.file(path).exists()) ? await Bun.file(path).text() : '';
    await Bun.write(path, existing + line);
};

const lines = async (obsId: string): Promise<Record<string, unknown>[]> =>
    (await Bun.file(recordPath(obsId)).text())
        .split('\n')
        .filter((l) => l.trim().length > 0)
        .map((l) => JSON.parse(l));

const nextSeq = async (obsId: string): Promise<number> =>
    (await lines(obsId)).filter((l) => typeof l.seq === 'number').length;

const open = async (flags: Record<string, string | true>): Promise<void> => {
    const subject = flags.subject;
    if (typeof subject !== 'string') refuse('--subject is required, and names what is being worked on.');

    // <subject>_<id>. Several may be open at once, including several on the same subject.
    const obsId = `${slug(subject)}_${now().replace(/[:.]/g, '-')}`;
    if (await Bun.file(recordPath(obsId)).exists()) refuse(`${obsId} already exists.`);
    await append(obsId, {
        event: 'open',
        at: now(),
        subject,
        // Attribution, because behaviour credited to a process may belong to the model or the harness.
        model: typeof flags.model === 'string' ? flags.model : null,
        harness: typeof flags.harness === 'string' ? flags.harness : null,
        workspace: typeof flags.workspace === 'string' ? flags.workspace : process.cwd()
    });
    console.log(obsId);
};

const add = async (flags: Record<string, string | true>): Promise<void> => {
    const obsId = await resolveOpen(flags);
    const kind = flags.kind;
    if (typeof kind !== 'string' || !isKind(kind)) refuse(`--kind must be one of: ${KINDS.join(', ')}`);
    if (typeof flags.what !== 'string') refuse('--what is required: what was actually done.');

    const effect = typeof flags.effect === 'string' ? flags.effect : 'read';
    if (!isEffect(effect)) refuse(`--effect must be one of: ${EFFECTS.join(', ')}`);

    // Everything not consumed above rides along as kind-specific fields. Flags arrive as
    // strings; the fields a consumer does arithmetic or joins on are coerced, and only those
    // -- blanket coercion would turn a version like "1.20" into a number and lose it.
    const reserved = new Set(['kind', 'what', 'effect', 'step', 'out-of-band', 'obs']);
    const numericFields = new Set(['exit', 'reconciled_by']);
    const extra = Object.fromEntries(
        Object.entries(flags)
            .filter(([k]) => !reserved.has(k))
            .map(([k, v]) => [k, numericFields.has(k) && typeof v === 'string' ? Number(v) : v])
    );

    const seq = await nextSeq(obsId);
    await append(obsId, {
        seq,
        at: now(),
        kind,
        effect,
        // Assigned by the recorder, later. Never requested from the subject.
        step: typeof flags.step === 'string' ? flags.step : null,
        in_band: flags['out-of-band'] !== true,
        what: flags.what,
        ...extra
    });
    console.log(`${obsId} #${seq} ${kind}`);
};

/** The second pass. Labels are revisable; the record is not rewritten, a correction is appended. */
const label = async (flags: Record<string, string | true>): Promise<void> => {
    const obsId = await resolveOpen(flags);
    const seq = Number(flags.seq);
    if (!Number.isInteger(seq)) refuse('--seq must name the entry being labelled.');
    if (typeof flags.step !== 'string') refuse('--step is required.');
    if (seq >= (await nextSeq(obsId))) refuse(`no entry #${seq} in ${obsId}.`);

    await append(obsId, { event: 'label', at: now(), labels: seq, step: flags.step });
    console.log(`${obsId} #${seq} -> ${flags.step}`);
};

const close = async (flags: Record<string, string | true>): Promise<void> => {
    const obsId = await resolveOpen(flags);
    const why = typeof flags.why === 'string' ? flags.why : 'completed';
    if (!isCloseReason(why)) refuse(`--why must be one of: ${CLOSE_REASONS.join(', ')}`);

    await append(obsId, { event: 'close', at: now(), why, entries: await nextSeq(obsId) });
    console.log(`${obsId} closed: ${why}`);
};

const status = async (flags: Record<string, string | true>): Promise<void> => {
    const open = await listOpen();
    if (open.length === 0) {
        const total = (await listObservations()).length;
        console.log(total === 0 ? 'no recordings' : `no recording open (${total} closed)`);
        return;
    }
    if (open.length > 1 && typeof flags.obs !== 'string') {
        console.log(`${open.length} recordings open:`);
        for (const id of open) {
            const n = (await lines(id)).filter((l) => typeof l.seq === 'number').length;
            console.log(`  ${id} — ${n} entries`);
        }
        return;
    }
    const obsId = typeof flags.obs === 'string' ? flags.obs : open[0]!;
    const all = await lines(obsId);
    const entries = all.filter((l) => typeof l.seq === 'number');
    const digressions = entries.filter((l) => l.in_band === false).length;
    const byKind = entries.reduce<Record<string, number>>((acc, l) => {
        const k = String(l.kind);
        acc[k] = (acc[k] ?? 0) + 1;
        return acc;
    }, {});
    console.log(`${obsId} open — ${entries.length} entries (${digressions} out of band)`);
    console.log(Object.entries(byKind).map(([k, n]) => `  ${k}: ${n}`).join('\n') || '  (none yet)');
    console.log(`  record: ${recordPath(obsId)}`);
};

const USAGE = `observe — record work as it happens, so a workflow can be derived from it

  open   --subject <ticket> [--model <m>] [--harness <h>] [--workspace <p>]   → prints <ticket>_<id>
  add    --kind <${KINDS.join('|')}> --what <text> [--effect read|write] [--step <s>] [--out-of-band] [--obs <id>] [--<field> <v> ...]
  label  --seq <n> --step <s> [--obs <id>]     assign a step to an earlier entry
  close  [--why ${CLOSE_REASONS.join('|')}] [--obs <id>]
  status [--obs <id>]

Writes to $OBSERVE_DIR (default ./observations). Off unless opened.
Several recordings may be open at once, including several on one ticket. --obs is optional
while exactly one is open and required once more than one is.`;

const main = async (): Promise<void> => {
    const [command, ...rest] = process.argv.slice(2);
    const flags = parseFlags(rest);
    const routes: Record<string, () => Promise<void>> = {
        open: () => open(flags),
        add: () => add(flags),
        label: () => label(flags),
        close: () => close(flags),
        status: () => status(flags)
    };
    const route = routes[command ?? ''];
    if (!route) {
        console.log(USAGE);
        process.exit(command ? 1 : 0);
    }
    await route();
};

await main();
