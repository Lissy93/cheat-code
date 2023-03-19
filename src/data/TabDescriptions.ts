import type { Descriptions } from '$/types/chat.types';

export const descriptions: Descriptions = {
  Refactor: {
    intro:
      'The refactor tool will improve your pasted code, to make it more readable, efficient, or maintainable.',
    placeholder: 'Paste your code to refactor here...',
    btnText: 'Improve!',
  },
  'Find Bug': {
    intro:
      'The bug finding tool, will identify any issues that may be causing your code to fail, and suggest fixes.',
    placeholder: 'Paste your code to debug here...',
    btnText: 'Fix!',
  },
  Explain: {
    intro:
      'The code explainer tool, will attempt to explain what your code is doing, and how it works.',
    placeholder:
      "Paste your code to generate an explanation of what's happening...",
    btnText: 'Explain!',
  },
  Generate: {
    intro:
      'The generate tool, will generate code in your given language, based on your inputted prompt. You can also use this to generate code from a given example.',
    placeholder: 'Write a prompt to generate code from here...',
    btnText: 'Generate!',
  },
};
