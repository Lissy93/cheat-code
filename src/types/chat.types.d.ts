const tabs = ['Refactor', 'Find Bug', 'Explain', 'Generate'] as const;

export type Tab = typeof tabs[number];

export interface ChatMessage {
  role: 'user' | 'system';
  content: string;
}

export type MessageLog = Record<Tab, ChatMessage[]>;

export type TabDescription = {
  intro: string;
  placeholder: string;
  btnText: string;
};

export type Descriptions = Record<Tab, TabDescription>;
