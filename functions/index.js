const admin = require("firebase-admin");
// const { getDatabase } = require('firebase-admin/database');
const functions = require("firebase-functions");
const {onRequest, onCall} = require("firebase-functions/v2/https");
// const { ref, get } = require('firebase/database');

admin.initializeApp({
  // credential: admin.credential.cert('./serviceAccountKey.json'), //for DEV
  credential: admin.credential.applicationDefault(), // for prod
  databaseURL: "https://la-luca-default-rtdb.europe-west1.firebasedatabase.app",
});

exports.helloWorld = onRequest({cors: true}, (request, response) => {
  console.log(request.body.data);
  functions.logger.info(request.body.data, {structuredData: true});
  response.status(200).send({data: "server message"});
});

exports.addAdminRole = onCall({cors: true}, async (request) => {
  console.log(request.data.email);
  const user = await admin.auth().getUserByEmail(request.data.email);
  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
  return `Success! ${request.data.email} has been made an admin`;
});

exports.removeAdminRole = onCall({cors: true}, async (request) => {
  console.log(request.data.email);
  const user = await admin.auth().getUserByEmail(request.data.email);
  await admin.auth().setCustomUserClaims(user.uid, null);
  return `Success! ${request.data.email} is no longer admin`;
});

// exports.listUsers = onRequest({ cors: true }, (request, response) => {
//   const listAllUsers = (nextPageToken) => {
//     admin
//       .auth()
//       .listUsers(1000, nextPageToken)
//       .then((listUsersResult) => {
//         listUsersResult.users.forEach((userRecord) => {
//           console.log('user', userRecord.toJSON());
//         });
//         if (listUsersResult.pageToken) {
//           // List next batch of users.
//           listAllUsers(listUsersResult.pageToken);
//         }
//         response.send({ data: listUsersResult.users });
//       })
//       .catch((error) => {
//         console.log('Error listing users:', error);
//       });
//   };
//   listAllUsers();
// });

// exports.listUsers = onCall({ cors: true }, async (request) => {
//   try {
//     const listAllUsers = async (nextPageToken) => {
//   const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
//       const users = listUsersResult.users.map((userRecord) =>
//         userRecord.toJSON()
//       );
//       if (listUsersResult.pageToken) {
//         // List next batch of users.
//         const nextBatchUsers = await listAllUsers(listUsersResult.pageToken);
//         return users.concat(nextBatchUsers);
//       }
//       return users;
//     };

//     const allUsers = await listAllUsers();
//     return allUsers;
//   } catch (error) {
//     console.error('Error listing users:', error);
//     throw new functions.https.HttpsError('internal', 'Error listing users');
//   }
// });

exports.listUsers = onCall({cors: "https://la-luca.web.app"}, (request) => {
  const listAllUsers = (nextPageToken) => {
    return admin
        .auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          const users = listUsersResult.users.map((userRecord) =>
            userRecord.toJSON(),
          );
          if (listUsersResult.pageToken) {
          // List next batch of users.
            return listAllUsers(listUsersResult.pageToken).then(
                (nextBatchUsers) => {
                  return users.concat(nextBatchUsers);
                },
            );
          }
          return users;
        });
  };

  return listAllUsers()
      .then((allUsers) => {
        return allUsers;
      })
      .catch((error) => {
        console.error("Error listing users:", error);
        throw new functions.https.HttpsError("internal", "Error listing users");
      });
});

// not used currently
// exports.getProducts = onCall({ cors: true }, (request) => {
//   // Get a database reference to our posts
//   const db = getDatabase();
//   const ref = db.ref('products');

//   // Use a Promise to handle the asynchronous database operation
//   return get(ref) //ERROR WITH get() on functions deploy, module not found
//     .then((snapshot) => {
//       // Data retrieved successfully, resolve the promise with the data
//       const products = snapshot.val();
//       console.log(products);
//       return products;
//     })
//     .catch((error) => {
//       // Handle errors and reject the promise if necessary
//       console.error('Error fetching products:', error);
//       throw new Error('Failed to fetch products');
//     });
// });
