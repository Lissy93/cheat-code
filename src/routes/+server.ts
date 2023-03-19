import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { env } from '$env/dynamic/private';

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = (async ({ request }) => {
  const { messages } = await request.json();

  const chatGPT = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
  });

  const chatGPTMessage = chatGPT.data.choices[0].message;

  return json(chatGPTMessage);
}) satisfies RequestHandler;
