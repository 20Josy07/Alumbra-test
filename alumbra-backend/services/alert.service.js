// alumbra-backend/services/alert.service.js
// Handles the logic for activating alerts and preparing data for email.service.
// It should retrieve necessary information (like user context from questionnaire)
// but NOT handle emergency contact details directly.

// const QuestionnaireModel = require('../models/questionnaire.model'); // To get user context
// const AnalysisModel = require('../models/analysis.model'); // To get analysis details
// const AlertModel = require('../models/alert.model'); // To record the alert
const emailService = require('./email.service'); // To send the email via webhook

const alertService = {
  processAlert: async (userId, analysisId, emergencyContactInfo) => {
    // IMPORTANT: emergencyContactInfo is passed here but *not* stored by this backend.
    // It's used solely to call emailService.sendAlertEmail.

    // 1. Fetch analysis details (to include in the alert)
    // const analysis = await AnalysisModel.findById(analysisId);
    const analysis = { // Placeholder
      riskAssessment: { riskScore: 9, riskSummary: "High risk detected." },
      detectedCategories: ["Severe manipulation"],
    };
    if (!analysis) {
      console.error(`Analysis not found for ID: ${analysisId}`);
      throw new Error('Analysis data not found for alert.');
    }

    // 2. Fetch user context/questionnaire (optional, if needed for the alert content)
    // const questionnaire = await QuestionnaireModel.findByUserId(userId);
    const userContext = { // Placeholder
        userName: "Concerned User (Placeholder)", // This should come from user data if available
        // Potentially other non-sensitive contextual info from questionnaire
    };

    // 3. Prepare data for the email service
    // This data will be sent to the external email service via webhook.
    // The email service itself will have the emergency contact's email address.
    const emailPayload = {
      recipientType: 'emergency_contact', // Indicates who the email is for
      // The actual email address of the emergency contact is handled by the email.service/webhook provider
      // This backend only signals *that* an email should be sent to an emergency contact.
      emailVariables: { // Variables to populate the email template
        userName: userContext.userName || "an Alumbra user",
        riskScore: analysis.riskAssessment.riskScore,
        riskSummary: analysis.riskAssessment.riskSummary,
        // Potentially a link to a generic support page, NOT a link to the specific analysis
        supportLink: "https://alumbra.ai/support-resources", // Example
      },
      // It's crucial the actual emergency contact's email is not in this payload if this payload is stored.
      // The `emergencyContactInfo` (e.g., email address) should be directly passed to `emailService.sendAlertEmail`
      // and not persisted by this backend.
    };

    // 4. Call the email service to send the alert
    // The emailService will use the emergencyContactInfo (e.g., email) to dispatch the message
    // via its configured webhook mechanism.
    const emailSent = await emailService.sendAlertEmail(emergencyContactInfo, emailPayload.emailVariables);

    // 5. Record the alert (without storing emergency contact)
    // await AlertModel.create({
    //   userId,
    //   analysisId,
    //   status: emailSent ? 'sent_via_webhook' : 'failed_to_send_webhook',
    //   alertDetails: { // Non-sensitive details about the alert trigger
    //     riskScore: analysis.riskAssessment.riskScore,
    //   }
    // });

    console.log(`Alert processed for user ${userId}, analysis ${analysisId}. Email dispatch status: ${emailSent}`);
    return { success: emailSent, message: `Alert email dispatch attempt: ${emailSent ? 'succeeded' : 'failed'}` };
  },
};

module.exports = alertService;
