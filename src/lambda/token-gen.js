import { createPlatformEndpoint } from "../utils/sns-notif";

export const handler = async (event) => {
  //throw new Error("range");
  const { deviceId, deviceToken } = JSON.parse(event.body);
  try {
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
  } catch (error) {
    console.log(`PlatformEndPoint Error-> ${JSON.stringify(error)}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Registered Failed. Error ${JSON.stringify(error)}}`,
      }),
    };
  }
};
