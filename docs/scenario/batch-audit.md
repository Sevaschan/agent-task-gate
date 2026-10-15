# Scenario: Batch quality and actionable output
- Given: Multiple individually plausible candidates form a training batch.
- When: The Skill reviews the batch.
- Then: It assesses coverage, duplication, lineage, yield, and repeated failure patterns and provides bounded next actions.

## Test Steps

- Case 1: Keep per-candidate verdicts separate from the batch decision.
- Case 2: Mark absent similarity, lineage, or yield evidence as unknown.

## Status
- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor
