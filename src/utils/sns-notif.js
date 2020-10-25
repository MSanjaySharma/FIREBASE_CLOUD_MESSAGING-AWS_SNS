const AWS = require("aws-sdk");

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
  const snsClient = Promise.promisifyAll(
    new AWS.SNS({ region: process.env.REGION })
  );

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
  return snsClient.createPlatformEndpointAsync(snsParams);
};

export const publish = (endpoint, platform, message, title) => {
  let payloadKey,
    payload = "";
  if (platform === "ios") {
    payloadKey = "APNS";
    payload = buildAPSPayloadString(message, title);
  } else if (platform === "android") {
    payloadKey = "GCM";
    payload = buildFCMPayloadString(message, title);
  }
  const snsClient = Promise.promisifyAll(
    new AWS.SNS({ region: process.env.REGION })
  );
  let snsMessage = {};
  snsMessage[payloadKey] = payload;

  let snsParams = {
    Message: JSON.stringify(snsMessage),
    TargetArn: endpoint,
    MessageStructure: "json",
  };
  return snsClient.publishAsync(snsParams);
};
