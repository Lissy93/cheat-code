
export const tabs = ['Refactor', 'Find Bug', 'Explain', 'Generate'] as const;

export type MessageLog = {
	[tab in typeof tabs[number]]: ChatMessage[];
};

export interface ChatMessage {
	role: string;
	content: string;
}

export type Descriptions = {
	[tab in typeof tabs[number]]: {
		intro: string;
		placeholder: string;
		btnText: string;
	};
};
