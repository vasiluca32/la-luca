const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { onRequest } = require('firebase-functions/v2/https');
const cors = require('cors')({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'), //for DEV
  // credential: admin.credential.applicationDefault(), //for prod
  databaseURL: 'https://la-luca-default-rtdb.europe-west1.firebasedatabase.app',
});

exports.helloWorld = onRequest((request, response) => {
  cors(request, response, () => {
    console.log(request.data);
    functions.logger.info(request.data, { structuredData: true });
    response.status(200).send({
      data: 'server message',
    });
  });
});

exports.addAdminRole = onRequest((request, response) => {
  cors(request, response, () => {
    // console.log(request.body.data.email);
    admin
      .auth()
      .getUserByEmail(request.body.data.email)
      .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
        });
      })
      .then(() => {
        return response.send({
          data: `Success! ${request.body.data.email} has been made an admin`,
        });
      });
  });
});
