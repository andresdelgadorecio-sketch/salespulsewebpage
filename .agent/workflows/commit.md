---
description: Automates the git add, commit, and push process.
---

1.  **Get Commit Message**:
    *   If the user provided a commit message in their request (e.g., "run commit workflow with message 'update styles'"), use that.
    *   If no message was provided, ask the user: "Por favor, dime qué mensaje quieres usar para el commit." and wait for their response.

2.  **Stage Changes**:
    *   Run the command: `git add .`
    // turbo

3.  **Commit Changes**:
    *   Run the command: `git commit -m "YOUR_MESSAGE_HERE"`
    *   *Replace "YOUR_MESSAGE_HERE" with the actual message obtained in step 1.*

4.  **Push Changes**:
    *   Run the command: `git push origin main`

5.  **Confirm**:
    *   Notify the user that the changes have been pushed successfully.
