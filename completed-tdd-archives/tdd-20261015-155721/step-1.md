# Step 1 - Understand Intent

## Functional Requirements

### FR-1: Evidence-bounded verdicts
Classify supplied material as observed, derived, claim, or unknown and issue only accept, repair, reject, or unverified verdicts without inventing missing execution evidence.

### FR-2: Environment and prompt feasibility
Check tool and state availability, policy compatibility, realism, and difficulty signal before treating a synthetic task as executable training data.

### FR-3: Verifier quality
Check prompt/specification alignment, positive replay, materially different negative outcomes, soundness, and completeness before accepting a verifier.

### FR-4: Batch quality and actionable output
Review coverage, duplication, lineage drift, yield, and failure patterns, then produce a fixed audit with per-candidate decisions, repairs, and next checks.

### FR-5: Installable bilingual delivery
Package the complete Skill as a safe schemaVersion 2 iPolloWork archive and provide equivalent English and Chinese product documentation, examples, release artifacts, and checksums.

## Assumptions

- The first release is a declarative pure Skill with no executable helper, external account, or remote service.
- Missing execution evidence cannot be replaced by reasoning from the prompt or reference trajectory.
- The public product documentation describes durable use rather than the event that motivated selection.
