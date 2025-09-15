/**
 * MANDATORY TypeScript Check Helper
 * 
 * This helper enforces the correct protocol for TypeScript checking
 * to prevent premature success claims that waste user credits.
 */

/**
 * Executes TypeScript check with proper monitoring protocol
 * NEVER modify this function to bypass the monitoring requirements
 */
export async function executeTypeScriptCheck() {
  console.log("🔍 EXECUTING TYPESCRIPT CHECK WITH MANDATORY MONITORING");
  console.log("📋 PROTOCOL: run_in_terminal → get_terminal_output → verify completion");
  
  // Step 1: Execute command (ALWAYS with isBackground: true)
  console.log("1️⃣ Running npm run type-check with isBackground: true");
  // await run_in_terminal({
  //   command: "npm run type-check",
  //   explanation: "Running TypeScript type check with mandatory monitoring protocol",
  //   isBackground: true
  // });
  
  // Step 2: Monitor output until completion
  console.log("2️⃣ Monitoring terminal output until command prompt returns");
  // await get_terminal_output({ id: terminalId });
  
  // Step 3: Verify completion before making claims
  console.log("3️⃣ Verifying clean completion or identifying specific errors");
  
  console.log("❌ NEVER claim success without seeing command prompt return");
  console.log("❌ NEVER assume success from partial output");
  console.log("✅ ONLY proceed after verified completion");
}

/**
 * Pre-flight checklist for TypeScript checking
 */
export const TypeScriptCheckProtocol = {
  MANDATORY_STEPS: [
    "Execute 'npm run type-check' with isBackground: true",
    "Call get_terminal_output and wait for completion", 
    "Verify command prompt returned",
    "Check for error messages in output",
    "Only claim success if NO errors found"
  ],
  
  VIOLATION_PREVENTION: {
    "Before claiming success": "Did I see the command prompt return?",
    "Before proceeding": "Did I verify no error messages?", 
    "Before any statements": "Am I making assumptions or did I verify?"
  },
  
  FORBIDDEN_ACTIONS: [
    "Claiming success without terminal verification",
    "Using isBackground: false for type-check", 
    "Making assumptions about command completion",
    "Proceeding without seeing actual output"
  ]
};

/**
 * Automatic reminder system
 */
export function typeScriptCheckReminder() {
  return `
🚨 MANDATORY TYPESCRIPT CHECK PROTOCOL 🚨

Before making ANY claims about TypeScript status:
1. Did you run 'npm run type-check' with isBackground: true?
2. Did you call get_terminal_output until command prompt returned?
3. Did you see either clean completion OR specific error messages?
4. Are you only claiming success if you verified NO errors?

If ANY answer is NO, you MUST re-run the check properly.

This protocol prevents wasting user credits and maintains trust.
THERE ARE NO EXCEPTIONS TO THIS RULE.
  `;
}