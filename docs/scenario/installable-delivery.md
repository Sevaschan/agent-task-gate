# Scenario: Installable bilingual delivery
- Given: A release is prepared for ordinary iPolloWork users and GitHub.
- When: The repository is packaged.
- Then: The archives, manifest, bilingual instructions, topics, examples, and checksums are complete and safe.

## Test Steps

- Case 1: Validate the schemaVersion 2 untrusted pure-Skill manifest and archive roots.
- Case 2: Verify bilingual docs contain equivalent installation, invocation, example, FAQ, and validation sections.

## Status
- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor
