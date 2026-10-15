# Example candidate batch

Environment: support sandbox 2.4.

Available tools: `tickets.search`, `tickets.set_priority`, and `users.lookup`.

Policy: resolved incidents cannot be modified; priority must be an integer from 1 through 5.

Candidate A asks the agent to raise the priority of active incident `INC-104` from 2 to 3. Its reference replay passes, but a negative outcome that changes the priority to 4 also passes the verifier. Target trials are 0/3 and teacher trials are 3/3.

Candidate B asks the agent to close `INC-104` as a duplicate by calling `tickets.close_as_duplicate`, but that tool is absent. No replay or verifier evidence is supplied.

Candidate C asks for the assignee name without mutation. Positive replay passes; wrong-user and forbidden-mutation negatives fail. Both target and teacher solve 3/3 trials. No similarity report is supplied for the batch.

Request: Use Agent Task Gate to audit this batch. Preserve the identifiers and counts, do not execute tools, and save a complete Markdown audit.
