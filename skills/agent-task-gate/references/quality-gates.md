# Quality gates

Apply the gates to each candidate. Record the supplied evidence, the conclusion, and what would change it.

## Evidence classes

| Class | Use |
|---|---|
| `observed` | A supplied log, state snapshot, verifier result, digest, dataset record, or other direct artifact. |
| `derived` | A conclusion computed from observed material with the derivation shown. |
| `claim` | An author, generator, teacher, or planner statement without direct supporting artifact. |
| `unknown` | Required information is absent, ambiguous, incompatible, or not independently checkable. |

Preserve supplied identifiers and numeric values. Missing execution, replay, or verification evidence remains `unknown`. Do not invent or fabricate evidence to complete a gate.

## Feasibility

Check the declared available tools, readable state, writable fields, preconditions, state transitions, authorization boundary, and policy. Map every reference action to an environment capability. An unavailable tool or action makes the task infeasible and normally leads to `reject` unless the task can be repaired without changing its capability target.

Check that the initial state contains the referenced entities, that all required transitions can occur, and that no required action violates policy. A plausible prompt is not proof that the environment can execute it.

## Realism

Check whether a real user of the target environment could reasonably make the request, whether constraints have a business or safety purpose, and whether the prompt avoids arbitrary difficulty. Record ambiguity that would produce multiple incompatible interpretations.

## Difficulty

Keep difficulty separate from feasibility and realism. Use supplied target/teacher trials only when the models, environment revision, task revision, run count, and success rule are comparable. A task already solved reliably by the target model provides little new training signal for the stated gap, though it may still serve another documented purpose.

Do not adopt one universal trial threshold. Report the supplied threshold or mark it unknown.

## Verifier alignment

Compare the verifier with the system specification, user prompt, initial state, expected final state, and prohibited side effects. Every required outcome must be checked, and checks must target the intended entity and magnitude.

## Soundness

Positive replay or verification asks whether a known-good trajectory reaches a valid final state and passes. Positive evidence alone is not enough to accept a verifier.

Require at least two materially different negative outcomes when acceptance is claimed: one should miss or corrupt the requested result, and another should exercise a relevant wrong target, prohibited side effect, or policy violation. They must fail for the right reason. A verifier that accepts an incorrect magnitude, wrong entity, partial completion, or forbidden mutation is unsound and needs `repair` or `reject`.

## Completeness

Check that the verifier can accept valid alternative trajectories and equivalent final states rather than one incidental action sequence. If only a reference path is tested, completeness is `unknown`; do not claim the verifier rejects legitimate solutions.

## Provenance and leakage

Record how the candidate was produced, the source license or permission status when supplied, and whether original evaluation prompts, entities, trajectories, or verifier details were exposed to generation. An origin note is a `claim` unless supported by a lineage record or comparison artifact. Suspected leakage requires a similarity/entity-overlap check before acceptance.

## Batch gates

- **Coverage:** compare accepted candidates with stated capability dimensions and identify missing or overrepresented regions.
- **Duplication:** use supplied exact-match and semantic-similarity results; if no similarity report exists, duplication is `unknown`.
- **Lineage:** ensure variants trace to vetted seeds and do not recursively multiply unreviewed variants; missing lineage evidence is `unknown`.
- **Yield:** report supplied generated, accepted, repaired, and rejected counts with rejection reasons; never infer counts from the candidate sample.
- **Failure patterns:** group recurring feasibility, verifier, policy, replay, and provenance failures and turn them into generation or review actions.

Batch acceptance requires candidate-level acceptance plus evidence that the accepted collection is not dominated by duplicates, leakage, or a narrow task family.
