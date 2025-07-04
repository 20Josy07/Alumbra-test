// alumbra-backend/models/alert.model.js
// Defines the schema or data model for tracking alerts that have been sent.
// Crucially, this model should NOT store the emergency contact details.

// Example using Mongoose (conceptual):
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const alertSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user for whom the alert was triggered
//   analysisId: { type: Schema.Types.ObjectId, ref: 'Analysis', required: true }, // Link to the analysis that triggered the alert
//   alertType: { type: String, enum: ['email_to_contact'], default: 'email_to_contact' }, // Type of alert
//   status: { type: String, enum: ['triggered', 'sent', 'failed', 'delivered', 'opened'], default: 'triggered' }, // Status of the alert dispatch
//   timestamp: { type: Date, default: Date.now },
//   // webhookResponse: { type: Object }, // Store response from webhook service if available
//   // DO NOT store emergency contact information here.
// });
//
// module.exports = mongoose.model('Alert', alertSchema);

// Placeholder if no ORM is immediately configured:
const AlertModel = {
  create: async (data) => {
    // data would include userId, analysisId, status, etc.
    console.log('Creating alert record (placeholder):', data);
    return { id: 'alert123', ...data, timestamp: new Date() };
  },
  updateStatus: async (alertId, status, webhookResponse) => {
    console.log(`Updating status for alert ${alertId} to ${status} (placeholder):`, webhookResponse);
    return { id: alertId, status, webhookResponse };
  },
  findById: async (id) => {
    console.log('Finding alert by ID (placeholder):', id);
    return { id, message: 'Placeholder alert data' };
  },
};

module.exports = AlertModel;
