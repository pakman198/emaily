const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: String,
  credits: { type: Number, default: 0 },
});

// we define the model name in singular and mongoose will map it to 
// the collection in plural (users)
mongoose.model('User', userSchema);
