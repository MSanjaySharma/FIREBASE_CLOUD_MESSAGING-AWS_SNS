const AWS = require("aws-sdk");

const snsClient = new AWS.SNS({ region: process.env.REGION });

const buildAPSPayloadString = (message, title) => {
  return JSON.stringify({
    aps: {
      title,
      alert: message,
    },
  });
};

const buildFCMPayloadString = (message, title) => {
  return JSON.stringify({
    notification: {
      title,
      text: message,
    },
  });
};

/* create individual platform endpoint */
export const createPlatformEndpoint = (platform, deviceId, deviceToken) => {
  let applicationArn = "";

  if (platform === "ios") {
    //applicationArn = process.env.SNS_PLATFORM_APP_IOS_ARN;
  } else if (platform === "android") {
    applicationArn = process.env.SNS_PLATFORM_APP_AND_ARN;
  }
  let snsParams = {
    Token: deviceToken,
    PlatformApplicationArn: applicationArn,
    CustomUserData: deviceId,
  };
  return snsClient.createPlatformEndpoint(snsParams).promise();
};

/* Publish message to particular device */
export const publish = (endpoint, platform, message, title) => {
  let payloadKey = "";
  let payload = "";
  if (platform === "ios") {
    payloadKey = "APNS";
    payload = buildAPSPayloadString(message, title);
  } else if (platform === "android") {
    payloadKey = "GCM";
    payload = buildFCMPayloadString(message, title);
  }
  let snsMessage = {};
  snsMessage[payloadKey] = payload;

  let snsParams = {
    Message: JSON.stringify(snsMessage),
    TargetArn: endpoint,
    MessageStructure: "json",
  };
  return snsClient.publish(snsParams).promise();
};
