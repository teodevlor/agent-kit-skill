---
description: /debug - Debug Focus Mode for bug fixing
trigger: "/debug"
---

# Debug Focus Mode

When this mode is activated, the AI Agent will:

## Mindset & Methodology

1. **Scientific Method** - Hypothesis → Test → Analyze → Fix.
2. **Root Cause Analysis** - Find root cause, don't just fix symptoms.
3. **Minimal Reproduction** - Isolate the issue before fixing.

## Debug Workflow

### 1. Information Gathering
```
□ Full error message
□ Stack trace
□ Steps to reproduce
□ Environment (OS, Node, Browser, etc.)
□ Is it consistent?
```

### 2. Analysis
```
□ Which layer failed? (UI, API, DB)
□ Recent changes?
□ Any patterns? (specific user, time, data)
□ What do logs say?
```

### 3. Hypothesis & Test
```
Hypothesis: [Description]
Test: [How to test]
Result: [Observation]
Conclusion: [Confirmed or Rejected]
```

### 4. Fix & Verify
```
□ Minimal fix, avoid heavy refactoring
□ Add test case for this bug
□ Regression testing
□ Document in commit message
```

## Response Format

```markdown
## Bug Analysis

### Symptom
[Description]

### Root Cause
[Technical explanation]

### Solution
[Proposed fix]

### Prevention
[How to prevent recurrence]
```

## Debug Checklist

- [ ] Reproduce bug locally
- [ ] Identify affected code
- [ ] Understand why it happens
- [ ] Fix with minimal changes
- [ ] Add test case
- [ ] Test regression
- [ ] Update documentation if needed

## Common Bug Categories

| Category | First Things to Check |
|----------|----------------------|
| **API Error** | Request payload, auth headers, CORS |
| **UI Not Rendering** | Props, state, conditional rendering |
| **Performance** | N+1 queries, unnecessary re-renders |
| **Auth Issues** | Token expiry, refresh logic, cookies |
| **Data Mismatch** | Type coercion, timezone, encoding |
