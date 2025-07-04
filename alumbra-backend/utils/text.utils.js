// alumbra-backend/utils/text.utils.js
// Utilities for preprocessing text (e.g., cleaning, tokenization, hashing).

const crypto = require('crypto');

const textUtils = {
  /**
   * Cleans text by removing excessive whitespace and normalizing line breaks.
   * @param {string} text - The input text.
   * @returns {string} The cleaned text.
   */
  cleanText: (text) => {
    if (typeof text !== 'string') return '';
    return text.replace(/\s+/g, ' ').trim(); // Replace multiple spaces/newlines with a single space
  },

  /**
   * Simple tokenizer (splits by space). For more advanced tokenization, use a library.
   * @param {string} text - The input text.
   * @returns {string[]} An array of tokens.
   */
  tokenize: (text) => {
    if (typeof text !== 'string') return [];
    return textUtils.cleanText(text).split(' ');
  },

  /**
   * Generates a hash of the input text (e.g., for checking duplicates).
   * @param {string} text - The input text.
   * @returns {string} The SHA256 hash of the text.
   */
  hashText: (text) => {
    if (typeof text !== 'string') return '';
    return crypto.createHash('sha256').update(text).digest('hex');
  },

  /**
   * Truncates text to a specified length, adding an ellipsis if truncated.
   * @param {string} text - The input text.
   * @param {number} maxLength - The maximum length of the output string.
   * @returns {string} The truncated text.
   */
  truncateText: (text, maxLength = 100) => {
    if (typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  },

  // Add other text utility functions as needed
};

module.exports = textUtils;
