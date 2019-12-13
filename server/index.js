
require('dotenv').config({ path: '.env' });
// Load models first before trying to use them, in this case, the User model is 
// being used inside the passport service
require('./models/UserModel'); 
require('./models/SurveyModel'); 
require('./services/passport');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'emaily'
})
.then(response => {
  // console.log({ response })
})
.catch(err => {
  console.log({ err }, err.errorLabels)
  throw new Error('MongoDB was not able to establish connection')
});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 1000 * 60 * 60 * 24 * 30,
  keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

app.get('/', (req, res) => {
  console.log(process.env)
  res.send('HELLO WORLD')
});

// check lecture 116 & 118. Routing in production and building in production
// i have 2 separate folders which work as 2 different apps and stephen has the client nested on the server.
// i would need to create a default route that redirects to the client home. Stephen doesn't redirect
// he sends the index file from the client folder

app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}`);
});