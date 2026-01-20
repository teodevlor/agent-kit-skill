---
description: Setup Role and Tech Stack configuration for projects using Agent Kit
---

# Setup Agent Kit Configuration

This workflow helps you create the `.agent-project-config.md` configuration file so the Agent can automatically identify the Role and Tech Stack for future sessions.

## Step 1: Identify Project Information
Please provide the following information:
1.  **Project Type** (Frontend / Backend / DevOps / Fullstack)
2.  **Tech Stack** (e.g., NestJS, NextJS, Python, Go, Laravel...)
3.  **Language** (TypeScript, Go, Python, PHP...)
4.  **Role Mode** (What role do you want the Agent to play? Implementer, Architect, or Reviewer?)

## Step 2: Create Configuration File
// turbo
Run the following command to copy the configuration template to the root directory:
```bash
cp /Users/kegiaumatvideptraigmail.com/Delitech/agent-kit/.agent/skills/custom-project-standards/templates/agent-project-config.md ./agent-project-config.md
```

## Step 3: User Guide for Editing
Open the newly created `agent-project-config.md` file and fill in the information you determined in Step 1 into the Frontmatter section.

Example:
```yaml
---
project_type: backend
tech_stack: nestjs
language: typescript
role_mode: implementer
style_level: strict
---
```

## Step 4: Verification
After the user finishes editing, read the file again to verify the configuration is valid.
