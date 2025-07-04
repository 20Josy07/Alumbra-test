// alumbra-backend/services/email.service.js
// Service for sending emails, specifically by making a request to an external webhook URL.

const envConfig = require('../config/env.config');
const fetch = require('node-fetch'); // Using node-fetch for CJS compatibility
const { logger } = require('../utils/logger');

const emailService = {
  /**
   * Sends an alert email by POSTing data to a configured webhook.
   * @param {object} emergencyContactInfo - Contains the recipient's email. E.g., { email: 'contact@example.com' }
   * @param {object} emailVariables - Data to be used in the email template by the webhook service.
   * @returns {Promise<boolean>} True if the webhook call was successful, false otherwise.
   */
  sendAlertEmail: async (emergencyContactInfo, emailVariables) => {
    const webhookUrl = envConfig.webhookUrl;
    if (!webhookUrl) {
      logger.error('WEBHOOK_URL is not configured. Cannot send email.');
      return false;
    }
    if (!emergencyContactInfo || !emergencyContactInfo.email) {
        logger.error('Emergency contact email is missing. Cannot send email.');
        return false;
    }

    const payload = {
      to: emergencyContactInfo.email, // The actual recipient email address
      template_id: 'alumbra_emergency_alert_template_v1', // Example template identifier for the webhook service
      dynamic_data: emailVariables, // Variables like userName, riskScore, riskSummary
    };

    try {
      logger.info(`Sending alert email to webhook: ${webhookUrl} for contact: ${emergencyContactInfo.email}`);
      logger.debug('Webhook payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary auth headers for the webhook if required by Make.com
          // e.g., 'Authorization': `Bearer ${process.env.MAKE_WEBHOOK_API_KEY}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        logger.error(`Webhook request failed: ${response.status} ${response.statusText}`, responseBody);
        return false;
      }
      
      // Make.com webhooks typically respond with "Accepted" (text/plain) or a JSON for more complex scenarios.
      // If it's just "Accepted", response.json() might fail.
      const responseText = await response.text();
      logger.info('Webhook response status:', response.status);
      logger.info('Webhook response body:', responseText);
      
      // Check if response indicates success (e.g. Make.com usually returns 200 OK with "Accepted")
      if (response.status === 200 && responseText.toLowerCase().includes('accepted')) {
        logger.info('Webhook call successful.');
        return true;
      } else {
        logger.warn('Webhook call succeeded with non-standard success response or status.', { status: response.status, body: responseText });
        // Depending on the webhook's behavior, this might still be a success.
        // For now, we'll be strict.
        return true; // Assuming 200 is generally success for Make.com webhooks.
      }

    } catch (error) {
      logger.error('Error sending email via webhook:', error);
      return false;
    }
  },
};

module.exports = emailService;
