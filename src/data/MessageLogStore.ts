import { writable, derived, type Readable } from 'svelte/store';
import type { ChatMessage } from '$/types/chat.types';
import { proompts } from '$/data/proompts';

const tabs = ['Refactor', 'Find Bug', 'Explain', 'Generate'] as const;

type MessageLog = {
  [tab in typeof tabs[number]]: ChatMessage[];
};

const initialMessages: MessageLog = {
  'Refactor': [{ role: 'system', content: proompts['Refactor'] }],
  'Find Bug': [{ role: 'system', content: proompts['Find Bug'] }],
  'Explain': [{ role: 'system', content: proompts['Explain'] }],
  'Generate': [{ role: 'system', content: proompts['Generate'] }],
};


export const messageLog = writable<MessageLog>(initialMessages);
