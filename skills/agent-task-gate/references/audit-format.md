# Audit format

Use these sections in order.

## 1. Audit scope

Name the batch, environment revision, candidate count, target/teacher identities when supplied, provided artifacts, and actions not performed.

## 2. Evidence ledger

| Evidence ID | Candidate or batch | Class | Supplied value | Audit use |
|---|---|---|---|---|

Keep observations, derivations, claims, and unknowns explicit.

## 3. Environment contract

List available tools, state, transitions, policies, and unresolved contract items. Do not invent a missing tool signature.

## 4. Candidate gate matrix

| Candidate | Feasibility | Realism | Difficulty | Verifier alignment | Soundness | Completeness | Provenance | Verdict |
|---|---|---|---|---|---|---|---|---|

Each cell should state `pass`, `fail`, or `unknown` plus an evidence ID or a short reason.

## 5. Batch decision

State one of `accept`, `repair`, `reject`, or `unverified`, followed by the decisive batch-level gates. If similarity evidence is absent, state that duplication/similarity is `unknown`.

## 6. Candidate decisions

For each candidate give:

- verdict and decisive gate;
- valid evidence that can be retained;
- disqualifying or unresolved evidence;
- whether repair preserves the original capability target.

## 7. Coverage and batch risks

Cover capability coverage, duplication/similarity, lineage, yield, and recurring failure patterns. Separate evidence about the supplied sample from claims about a larger dataset.

## 8. Required repairs

List candidate-specific or generator-level changes. Each repair must identify the artifact to change, the expected behavior, and the check that proves the repair.

## 9. Next checks

Order the smallest evidence-producing checks that can change a verdict. Include owner or responsible role when supplied. Do not fabricate executable commands.

## 10. Training-use boundary

End with the exact advisory sentence required by `SKILL.md`.
