# Agent Task Gate Audit: Synthetic agent-task batch ATG-24

## 1. Audit scope

- Batch: `ATG-24`.
- Audit date: `2026-10-03`.
- Target environment: `Helpdesk Sandbox 2.4`.
- Candidate count: `3` candidates.
- Target model: `target-small-r7`.
- Teacher model: `teacher-large-r3`.
- Provided artifacts: environment contract, policies, seed state, candidate prompts, capability targets, reference trajectories, verifiers, replay/negative evidence where supplied, target/teacher trials where supplied, origin notes, and batch evidence.
- Actions not performed: no environment tools, candidate tasks, verifiers, trajectory replays, training, or other execution were performed. This is a supplied-artifact audit only.

## 2. Evidence ledger

| Evidence ID | Candidate or batch | Class | Supplied value | Audit use |
|---|---|---|---|---|
| E-ENV | Batch | observed | Available tools are `tickets.search(query)`, `tickets.set_priority(ticket_id, priority)`, and `users.lookup(user_id)`; policies prohibit modifying resolved incidents, require priority to remain an integer from 1 through 5, and require minimum user fields. | Feasibility and policy boundary. |
| E-STATE | Batch | observed | Seed state: `INC-104` is active, assigned to `USR-7`, priority 2; `INC-105` is resolved, assigned to `USR-9`, priority 3. | Initial entities, transitions, and prohibited mutation. |
| E-001-R | ATG-001 | observed | Reference replay log: `INC-104` changed from priority 2 to 3; verifier returned pass. | Positive replay and verifier behavior. |
| E-001-N | ATG-001 | observed | Negative mutation A changed resolved `INC-105` from priority 3 to 4; verifier returned fail. Negative mutation B changed active `INC-104` from priority 2 to 4; verifier returned pass. | Soundness and policy checks. |
| E-001-T | ATG-001 | observed | Target trials: 0/3 success. Teacher trials: 3/3 success. | Supplied difficulty evidence. |
| E-001-O | ATG-001 | claim | Generated from a capability card; the original evaluation prompt was not supplied. | Provenance context; not independently supported. |
| E-002-F | ATG-002 | observed | No `tickets.close_as_duplicate` tool appears in the environment contract. | Infeasibility. |
| E-002-M | ATG-002 | unknown | No replay, positive verification, negative verification, or solver trials were supplied. | Unresolved verifier, soundness, completeness, and difficulty gates. |
| E-003-R | ATG-003 | observed | Reference replay returned the seeded display name; a before/after state digest matched; verifier returned pass. | Positive replay, read-only behavior, and alignment. |
| E-003-N | ATG-003 | observed | Negative mutation A returned the name of `USR-9`; verifier returned fail. Negative mutation B returned the correct name after changing `INC-104` priority; verifier returned fail. | Soundness against wrong entity and prohibited mutation. |
| E-003-T | ATG-003 | observed | Target trials: 3/3 success. Teacher trials: 3/3 success. | Supplied difficulty evidence. |
| E-003-O | ATG-003 | claim | Generated independently from a capability card; no similarity or entity-overlap report was supplied. | Provenance claim and unresolved leakage/duplication check. |
| E-BATCH | Batch | observed | Accepted-candidate count: not supplied. Pairwise similarity report: not supplied. Coverage target: selection, policy compliance, safe mutation, read-only lookup, and cross-record reasoning. The batch contains three candidates and no previous accepted seed lineage. | Batch coverage, duplication, lineage, and yield. |
| D-001 | ATG-001 | derived | The verifier accepts priority 4 on active `INC-104`, although the requested result is priority 3; verifier soundness fails. | Candidate verdict. |
| D-002 | ATG-002 | derived | The reference action cannot be mapped to a declared environment capability; feasibility fails. | Candidate verdict. |
| D-003 | ATG-003 | derived | Supplied positive and two materially different negative outcomes support alignment and soundness, but completeness and similarity/lineage evidence remain unresolved. | Candidate verdict. |

## 3. Environment contract

- Available tools: `tickets.search(query)` reads matching incidents; `tickets.set_priority(ticket_id, priority)` changes priority on an active incident; `users.lookup(user_id)` reads a user record.
- Readable state: incidents and user records as exposed by the declared tools; the supplied seed includes `INC-104`, `INC-105`, `USR-7`, and `USR-9`.
- Writable field: active-incident priority through `tickets.set_priority(ticket_id, priority)`.
- Required transition constraints: priority must remain an integer from 1 through 5; resolved incidents must not be modified.
- Data-minimization policy: read only the minimum user fields needed for the request.
- Unresolved contract items: `tickets.close_as_duplicate` is not declared; no tool signature or transition for closing/linking duplicate incidents is supplied. Evidence for alternative valid trajectories is not supplied.

## 4. Candidate gate matrix

| Candidate | Feasibility | Realism | Difficulty | Verifier alignment | Soundness | Completeness | Provenance | Verdict |
|---|---|---|---|---|---|---|---|---|
| `ATG-001` | pass (E-ENV, E-STATE) | pass (prompt matches active assigned incident) | pass (E-001-T; target/teacher trials are supplied, with 0/3 versus 3/3) | fail (D-001; verifier checks any incident at priority 3, not the requested `INC-104` change) | fail (E-001-N; active `INC-104` at priority 4 passes) | unknown (no alternative valid trajectory evidence) | unknown (E-001-O is a claim; original evaluation prompt not supplied) | repair |
| `ATG-002` | fail (E-002-F; required close tool unavailable) | pass (the requested duplicate closure is a plausible helpdesk action) | unknown (E-002-M; no solver trials) | unknown (E-002-M; no replay or verification evidence) | unknown (E-002-M; no negative verification) | unknown (E-002-M; no alternative-path evidence) | unknown (no provenance artifact supplied) | reject |
| `ATG-003` | pass (E-ENV, E-STATE) | pass (read-only assignee lookup is plausible and policy-compatible) | pass (E-003-T; target and teacher each report 3/3) | pass (E-003-R, E-003-N; seeded name and unchanged state are checked) | pass (E-003-N; wrong entity and prohibited mutation both fail) | unknown (only the reference path is evidenced) | unknown (E-003-O; no similarity/entity-overlap report) | unverified |

## 5. Batch decision

**unverified**. ATG-001 requires verifier repair because it accepts an incorrect magnitude; ATG-002 is infeasible because `tickets.close_as_duplicate` is absent; and ATG-003 lacks completeness and similarity/entity-overlap evidence. Batch acceptance also cannot be established because the accepted-candidate count is not supplied, the pairwise similarity report is not supplied, and previous accepted seed lineage is absent. Per-candidate verdicts are not overwritten by this batch decision.

## 6. Candidate decisions

### `ATG-001` — `repair`

- Decisive gate: verifier alignment and soundness fail (D-001, E-001-N).
- Valid evidence that can be retained: the declared environment supports searching and updating active incidents; E-001-R shows `INC-104` changed from priority 2 to 3 and the verifier returned pass; E-001-N shows the resolved-incident mutation failed.
- Disqualifying or unresolved evidence: the verifier passes active `INC-104` at priority 4; completeness is unknown; provenance is only a claim.
- Repair preservation: yes. Replacing the verifier with a check for the intended `INC-104` result, including the requested one-step change from priority 2 to 3 and no prohibited mutation, preserves the capability target.

### `ATG-002` — `reject`

- Decisive gate: feasibility fails (E-002-F).
- Valid evidence that can be retained: the prompt and intended duplicate relationship may document a helpdesk capability, but no executable candidate evidence is established.
- Disqualifying or unresolved evidence: `tickets.close_as_duplicate` is unavailable; replay, positive verification, negative verification, and solver trials are absent.
- Repair preservation: no, not within the declared environment. Adding the missing close/link capability would change the declared environment contract; substituting a different task would change the capability target.

### `ATG-003` — `unverified`

- Decisive gate: completeness and provenance/duplication remain unknown (E-003-O, E-BATCH).
- Valid evidence that can be retained: the replay returned the seeded display name and the before/after state digest matched; the wrong `USR-9` response and priority mutation both failed; target and teacher trials are each 3/3.
- Disqualifying or unresolved evidence: only the reference path is tested, so legitimate alternative trajectories are not demonstrated; no similarity or entity-overlap report is supplied.
- Repair preservation: yes. Adding equivalent valid-trajectory checks and a similarity/entity-overlap artifact preserves the read-only lookup capability target.

## 7. Coverage and batch risks

- Capability coverage: the stated target covers selection, policy compliance, safe mutation, read-only lookup, and cross-record reasoning (E-BATCH). The supplied sample includes safe mutation in `ATG-001`, an unavailable mutation in `ATG-002`, and read-only lookup in `ATG-003`; cross-record reasoning is present in the prompts, but accepted coverage is not established.
- Duplication/similarity: unknown. The pairwise similarity report is not supplied, and `ATG-003` explicitly lacks a similarity or entity-overlap report (E-003-O, E-BATCH).
- Lineage: unknown for acceptance purposes. The batch contains three candidates and no previous accepted seed lineage; origin notes are claims rather than lineage records.
- Yield: the accepted-candidate count is not supplied. No generated, repaired, or rejected counts beyond the supplied candidate-level material are inferred (E-BATCH).
- Recurring failure patterns: verifier over-broadness and magnitude blindness appear in `ATG-001`; missing environment capability appears in `ATG-002`; missing completeness and similarity evidence appear in `ATG-003` and the batch. Generation and review should add entity/magnitude-specific verifier checks, validate tool-contract feasibility before generation, and require alternative-trajectory plus lineage/similarity artifacts.
- Evidence boundary: these conclusions concern the supplied sample only and are not claims about a larger dataset.

## 8. Required repairs

1. `ATG-001` verifier: change the acceptance predicate to target `INC-104`, require the requested priority result 3 from the seeded priority 2, and reject priority 4 or any other magnitude; prove it with the existing positive replay plus a wrong-magnitude negative mutation and a wrong-entity/prohibited-side-effect negative mutation.
2. `ATG-001` evidence: retain the target/teacher trial record and add a provenance/lineage artifact supporting or qualifying E-001-O; prove the repair with a comparison record that identifies the source and any exposed evaluation material.
3. `ATG-002` environment/candidate placement: either supply an authorized `tickets.close_as_duplicate` capability and a compatible contract, state, policy, replay, and verifier package, or remove this candidate from this environment-bound batch; prove the change with a positive replay and two materially different negative verifications.
4. `ATG-003` verifier evidence: test at least one valid alternative trajectory or equivalent final state, not only the reference path; prove completeness by showing the alternative passes while wrong entity and prohibited mutation still fail.
5. Batch evidence: supply the pairwise similarity/entity-overlap report, accepted-candidate count, and non-recursive seed lineage record; prove batch readiness by reconciling those artifacts with the three candidate records and the stated coverage target.

## 9. Next checks

1. **Verifier owner:** rerun the `ATG-001` verifier against the supplied positive replay and the active-incident priority 4 negative mutation; a corrected result that fails the latter can change `ATG-001` soundness.
2. **Environment owner:** confirm whether `tickets.close_as_duplicate` is intentionally unavailable in `Helpdesk Sandbox 2.4`; a declared, authorized capability plus contract evidence is required before feasibility can change for `ATG-002`.
3. **Verifier owner:** provide one equivalent valid `ATG-003` trajectory or final state and verify that it passes; this can change completeness from unknown.
4. **Provenance owner:** provide lineage and similarity/entity-overlap artifacts for `ATG-003` and the batch; this can change the provenance and duplication unknowns.
5. **Batch owner:** provide generated, accepted, repaired, and rejected counts, including rejection reasons, and reconcile them with the stated coverage dimensions; this can change the batch yield assessment.

## 10. Training-use boundary

This audit qualifies training data only within the reviewed evidence; run the missing environment and verifier checks before using unresolved samples for model training.
