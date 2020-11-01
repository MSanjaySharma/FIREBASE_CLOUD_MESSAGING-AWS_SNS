const axios = require("axios").default;
const { google } = require("googleapis");

const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];
const PROJECT_ID = process.env.FCM_PROJECT_ID;
const URL = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;

export const handler = async (event) => {
  const { title, body } = JSON.parse(event.body);
  try {
    const accessToken = await getAccessToken();
    console.log(`ACCESS TOKEN -> ${accessToken}`);
    try {
      const DATA = {
        message: {
          token: process.env.TEST_DEVICE_TOKEN,
          notification: { title, body },
        },
      };
      const CONFIG = { headers: { Authorization: `Bearer ${accessToken}` } };
      const res = await axios.post(URL, DATA, CONFIG);
      console.log(`RESPONSE FROM FCM -> ${JSON.stringify(res.data)}`);
      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };
    } catch (err) {
      const { code, message } = err.response.data.error;
      console.log(`ERROR -> ${JSON.stringify(err.response.data)}`);
      return {
        statusCode: code,
        body: message,
      };
    }
  } catch (err) {
    console.log(`ACCESS TOKEN ERROR -> ${err}`);
  }
};

const getAccessToken = () => {
  return new Promise(function (resolve, reject) {
    const key = require("../../sls/env/serviceAccountKey.json");
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
};
