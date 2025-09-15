# MANDATORY TypeScript Check Protocol - VIOLATION PREVENTION

## CRITICAL RULE: NEVER CLAIM TYPE CHECK SUCCESS WITHOUT VERIFICATION

This protocol MUST be followed for EVERY `npm run type-check` command:

### STEP 1: Execute Command
```bash
npm run type-check
```
- ALWAYS use `isBackground: true`
- NEVER use `isBackground: false`

### STEP 2: Monitor Output
```bash
get_terminal_output
```
- MUST call this until command prompt returns
- MUST see either errors OR clean completion
- NEVER proceed without seeing actual output

### STEP 3: Verification Rules

#### SUCCESS CASE:
```
PS C:\...\tld-challenges-frontend> npm run type-check
> tld-challenges-frontend@0.1.0 type-check
> tsc --noEmit
PS C:\...\tld-challenges-frontend>
```
- Command prompt returns immediately after `tsc --noEmit`
- NO error messages visible
- ONLY THEN can claim success

#### FAILURE CASE:
```
PS C:\...\tld-challenges-frontend> npm run type-check
> tld-challenges-frontend@0.1.0 type-check
> tsc --noEmit
src/components/SomeFile.tsx:22:11 - error TS2322: ...
Found X errors in Y files.
PS C:\...\tld-challenges-frontend>
```
- Error messages are displayed
- Must fix errors before proceeding

### VIOLATION PREVENTION CHECKLIST

Before making ANY claim about TypeScript status:

- [ ] Did I run `npm run type-check` with `isBackground: true`?
- [ ] Did I call `get_terminal_output` and wait for completion?
- [ ] Did I see the actual command prompt return?
- [ ] Did I verify NO error messages were shown?
- [ ] Am I only claiming success if ALL above are true?

### AUTOMATIC REMINDER

**EVERY TIME before claiming TypeScript success, ask yourself:**
"Did I actually see the command prompt return with no errors, or am I making assumptions?"

If you cannot answer with 100% certainty that you saw clean completion, you MUST re-run the check.

### CONSEQUENCES OF VIOLATION

Violating this protocol:
- Wastes user's request credits
- Breaks user's trust
- Requires extra debugging rounds
- Is completely preventable with proper procedure

### IMPLEMENTATION

This protocol is NON-NEGOTIABLE. There are no exceptions.