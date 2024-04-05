import { OpenAIStream } from "../../utils/open-ai-stream";
import { StreamingTextResponse } from "ai";

export const runtime = "edge";

export default async function handler(req, res) {
  try {
    const { prompt } = await req.json();

    const basePayloadPrefix = `
      Write me a detailed table of contents for a blog post with the title below.

      Title: ${prompt}
    `;

    const basePayload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: basePayloadPrefix }],
      temperature: 0.85,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1770,
      stream: true,
      n: 1,
    };

    const basePayloadOutput = await OpenAIStream(basePayload);

    const secondPrompt = `
      Take the table of contents and title of the blog post below and generate a blog post written in the style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why. Generate a minimum of 3000 words. Please format your response in HTML.

      Title: ${prompt}

      Table of Contents: ${basePayloadOutput}

      Blog Post:
    `;

    const finalPayload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: secondPrompt }],
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 4000,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(finalPayload);

    return new StreamingTextResponse(stream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
