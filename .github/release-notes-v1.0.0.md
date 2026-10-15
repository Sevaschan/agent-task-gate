# Agent Task Gate 1.0.0

Audit synthetic agent-training tasks before they enter a dataset. The Skill checks environment feasibility, prompt realism and difficulty, verifier alignment and negative behavior, provenance, and batch coverage, then produces evidence-bounded candidate decisions and testable repairs.

## Assets

- `agent-task-gate-1.0.0.ipollowork-plugin` — direct iPolloWork installer
- `agent-task-gate-1.0.0-skill.zip` — standalone Skill directory
- `agent-task-gate-1.0.0-source.zip` — development source
- `SHA256SUMS.txt` — SHA-256 checksums

The package is declarative and untrusted, contains one Skill resource, requests no permissions, and does not execute candidate tasks or train models.
