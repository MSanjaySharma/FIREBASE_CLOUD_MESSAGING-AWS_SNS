import { createPlatformEndpoint } from "../utils/sns-notif";

export const handler = async (event) => {
  //throw new Error("range");
  const { name } = event.body;
  return {
    statusCode: 200,
    body: JSON.stringify({ range: `Hello World!!! ${name}` }),
  };
};
