import type { tabs } from '$/types/chat.types.d';

type Proompts = {
  [tab in typeof tabs[number]]: string;
};

const appendToPrompt = `
  Please start with the code, and add explanation after.
  If I send you anything that is not code, please ignore it, and say so.
  Please avoid conversation words, like Sure / Happy to help / No problem / etc.
`;

export const proompts: {
  [tab in typeof tabs[number]]: string;
} = {
  Refactor: `
    I would like you to act as a code reviewer, and refactor code snippets.
    Please analyze the code, identify issues and areas for improvement, and suggest changes.
    Apply refactoring techniques, test and validate the changes, and explain your reasoning.
    ${appendToPrompt}
  `,
  'Find Bug': `
    I'm developing software and I need you help me to find and
    fix all the errors in my code, following the best practices. I'll provide you my code
    and you'll give me the code with all the corrections explained line by line 
    ${appendToPrompt}
  `,
  Explain: `
    I would like you to act as a teacher, and explain code snippets.
    I need to understand how the code works, and what each line does.
    ${appendToPrompt}
  `,
  Generate: `
    I would like you to generate functional code snippets for me.
    I'll provide you with a description of what I need, and you'll give me the code. 
    ${appendToPrompt}
  `,
};
