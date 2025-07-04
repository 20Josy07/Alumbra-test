// alumbra-backend/utils/email.utils.js
// Utilities for preparing email content, particularly for dynamic alert emails.

const emailUtils = {
  /**
   * Generates dynamic content for an alert email.
   * This function helps prepare the variables that will be sent to the email templating system
   * (which is handled by the external webhook service).
   *
   * @param {object} analysisData - Data from the conversation analysis.
   *                                 Example: { riskScore: 8, riskSummary: "High risk detected..." }
   * @param {object} userData - Optional data about the user.
   *                            Example: { userName: "Jane Doe" }
   * @returns {object} An object containing variables for the email template.
   */
  generateAlertEmailVariables: (analysisData, userData = {}) => {
    const userName = userData.userName || "an Alumbra user"; // Default if user name is not available
    const { riskScore, riskSummary } = analysisData;

    // This is a simplified example. The actual content and structure
    // would depend on the email template used by the webhook service.
    const subject = `Alumbra AI Alert: Important Information Regarding ${userName}`;

    const bodyIntro = `This is an automated alert from Alumbra AI regarding ${userName}. ` +
                      `A recent conversation analysis has indicated a potential risk.`;

    const details = `Details: Risk Score: ${riskScore}/10. Summary: ${riskSummary}`;

    // It's crucial not to include specific examples from the conversation here for privacy reasons,
    // unless explicitly designed and consented to, and handled securely by the email service.
    // The goal is to alert the emergency contact, not to share the conversation itself.

    const nextSteps = `We recommend checking in with ${userName}. ` +
                      `For general information and support resources, please visit [Your Support Page URL].`;

    // These variables would be consumed by the email templating engine of the webhook service
    return {
      emailSubject: subject, // Often the webhook service handles subject separately or via template
      userName: userName,
      riskScore: riskScore,
      riskSummary: riskSummary,
      alertIntro: bodyIntro,
      alertDetails: details,
      alertNextSteps: nextSteps,
      supportLink: "https://alumbra.ai/support-resources" // Example static link
      // Any other dynamic fields needed by the email template
    };
  },

  // You might add functions to generate content for other types of emails (e.g., notifications)
};

module.exports = emailUtils;
