import { publish } from "../utils/sns-notif";

export const handler = async (event) => {
  //throw new Error("range");
  const { title, message } = JSON.parse(event.body);
  try {
    const publishData = await publish(
      process.env.SNS_ENDPOINT_TEST,
      "android",
      title,
      message
    );
    console.log(`PUBLISHED DATA -> ${JSON.stringify(publishData)}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Message Published` }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Message NOT delivered. Error -> ${JSON.stringify(error)}`,
      }),
    };
  }
};
