import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import fetch from "node-fetch";

const prompt = "a huge snow leopard jumps towards a boy in a desert sandstorm";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_APIKEY,
});

const openai = new OpenAIApi(configuration);

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "1024x1024",
});

const url = result.data.data[0].url;
console.log("image url:", url);

console.log("fetching image...");
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
const imgName = `./img/${Date.now()}.png`;
writeFileSync(imgName, buffer);
console.log(`saved: ${imgName}`);
