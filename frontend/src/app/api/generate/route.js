import { OpenAIStream } from "@/utils/open-ai-stream";

const basePromptPrefix = `
Write me a detailed table of contents for a blog post with the title below.

Title:
`;

export const POST = async (req) => {
  const { prompt } = await req.json();

  // const baseCompletion = await openai.createCompletion({
  //     model: 'text-davinci-004',
  //     prompt: `${basePromptPrefix}${req.body.userInput}`,
  //     temperature: 0.8,
  //     max_tokens: 1774,
  //   });

  const basePayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
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
  Take the table of contents and title of the blog post below and generate a blog post written in the style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

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

  console.log(stream);

  return new Response(stream);
};
