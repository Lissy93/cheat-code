import { writable } from 'svelte/store';
import type { MessageLog } from '$/types/chat.types';
import { proompts } from '$/data/proompts';

const tabs = ['Refactor', 'Find Bug', 'Explain', 'Generate'] as const;

const initialMessages: MessageLog = tabs.reduce((acc, tab) => {
  acc[tab] = [{ role: 'system', content: proompts[tab] }];
  return acc;
}, {} as MessageLog);

export const messageLog = writable<MessageLog>(initialMessages);
