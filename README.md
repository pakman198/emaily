# Node with React: Fullstack Web Development

Gave my own personal touch and started using hooks and instead of using Passport with Google Strategy, I used Facebook Strategy.

Implemented [SendGrid](https://sendgrid.com/) as the mailing service and [Stripe](https://stripe.com/) as the payments service.

The project proposes ReduxForm for form validation, but since I started working with hooks, I tried to find an alternate solution. Then I found [React-Hook-Form](https://react-hook-form.com/) which is super easy to use and less painful than wiring up ReduxForm.
With ReduxForm you have the form data at a global level, and there's no need of that.

For UI, I used [Materialize](https://materializecss.com/) which is a CSS framework based on Material Design.

## Available Scripts

### `npm start`
Inside the `client` folder, after installing all the dependencies (`npm install`), run this command to start the frontend application.

### `npm run dev`
Inside the `server` folder, after installing all the dependencies (`npm install`), run this command to start the backend application.
Check the `.env.example` file to generate your own environment variables and make the app work properly.

#### Notes

I had to downgrade from `react-scripts@3.3` to `react-scripts@3.2` because there's an [issue](https://stackoverflow.com/questions/59241291/securityerror-failed-to-construct-websocket-when-i-upload-react-js-applicatio) with websockets, so my deployed app in heroku didn't work, I had to load it via http.

There's a problem with the communication between Facebook and the Heroku-hosted app since. The heroku app is loaded via https but it doesn't have its own certificate, for that reason, Facebook blocks the URL and doesnt allow you to do the login.
A solution to this is [upgrading your dyno](https://stackoverflow.com/a/52098136/3818768) so you can get a certificate for the app.

I had to use a `setupProxy.js` file as mentioned in the `create-react-app` [docs](https://create-react-app.dev/docs/proxying-api-requests-in-development/) to be able to make the API calls. Something to mention is the `changeOrigin: true` property, since I deployed my node server to Heroku and kept developing the frontend, there were some issues with the communication between the heroku app and localhost, so I added that property to get rid of the error.