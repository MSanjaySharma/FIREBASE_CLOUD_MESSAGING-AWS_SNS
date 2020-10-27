import { createPlatformEndpoint } from "../utils/sns-notif";

export const handler = async (event) => {
  //throw new Error("range");
  const { deviceId, deviceToken } = JSON.parse(event.body);
  const PlatformEndpoint = await createPlatformEndpoint(
    "android",
    deviceId,
    deviceToken
  );
  console.log(`PlatformEndPoint-> ${JSON.stringify(PlatformEndpoint)}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Registered Succesfully. PlatformEndPoint-> ${JSON.stringify(
        PlatformEndpoint
      )}`,
    }),
  };
};
