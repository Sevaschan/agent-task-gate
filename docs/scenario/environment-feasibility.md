# Scenario: Environment and prompt feasibility
- Given: A generated task references tools, state transitions, and policies.
- When: The Skill checks whether the task can run in the declared environment.
- Then: Unavailable actions and prohibited transitions block acceptance, while realism and difficulty remain separately assessed.

## Test Steps

- Case 1: Reject or repair a task that names an unavailable tool.
- Case 2: Keep feasibility, realism, and difficulty as distinct gates.

## Status
- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor
