# Scenario: Evidence-bounded verdicts
- Given: Candidate task material mixes logs, author notes, arithmetic, and missing checks.
- When: The Skill audits the candidate.
- Then: Every important conclusion is evidence-classified and the verdict is one of accept, repair, reject, or unverified.

## Test Steps

- Case 1: Preserve identifiers and trial counts while classifying provenance.
- Case 2: Treat missing logs as unknown and never as implied success.

## Status
- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor
