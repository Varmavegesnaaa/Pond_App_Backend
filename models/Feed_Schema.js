const mongoose = require('mongoose');

// Define the form schema
const feedSchema = new mongoose.Schema({
  feed_name: { type: String, required: true },
  feed_count: { type: Number, required: true },
  message: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Feed', feedSchema);
