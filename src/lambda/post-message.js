import { publish } from "../utils/sns-notif";

export const handler = async (event) => {
  //throw new Error("range");
  const { title, message } = event.body;
  const publishData = await publish(
    "arn:aws:sns:us-east-1:131489964612:endpoint/GCM/FCM/3b45fd25-8e93-3523-80d9-bb891c8281d6",
    "android",
    title,
    message
  );
  console.log(`PUBLISHED DATA -> ${publishData}`);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Message Published` }),
  };
};
