# Scenario: Verifier quality
- Given: A candidate has a verifier and partial execution evidence.
- When: The Skill evaluates verifier quality.
- Then: It checks positive replay, materially different negative outcomes, prompt alignment, soundness, and completeness.

## Test Steps

- Case 1: Detect a verifier that accepts the wrong magnitude or target.
- Case 2: Do not accept a verifier from positive evidence alone.

## Status
- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor
