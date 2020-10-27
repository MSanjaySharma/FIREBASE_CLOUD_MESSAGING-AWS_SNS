import { createPlatformEndpoint } from "../utils/sns-notif";

export const handler = async (event) => {
  //throw new Error("range");
  const { deviceId, deviceToken } = event.body;
  const PlatformEndpoint = await createPlatformEndpoint(
    "android",
    deviceId,
    deviceToken
  );
  console.log(`PlatformEndPoint-> ${PlatformEndpoint}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Registered Succesfully. PlatformEndPoint-> ${PlatformEndpoint}`,
    }),
  };
};
