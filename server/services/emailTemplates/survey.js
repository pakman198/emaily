require('dotenv').config({ path: '.env' });
module.exports = (survey) => {
  return `
  <html>
    <body>
      <div style="text-align: center">
        <h3>We want to hear you!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${process.env.REDIRECT_ANGULAR_DOMAIN}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${process.env.REDIRECT_ANGULAR_DOMAIN}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
}