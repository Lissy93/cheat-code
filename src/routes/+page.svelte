<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { slide } from 'svelte/transition';
	import Icon from '$/lib/Icon.svelte';
	import type { ChatMessage } from '$/types/chat.types';
	import { proompts } from '$/data/proompts';
	import { messageLog } from '$/data/MessageLogStore';

	const tabs = ['Refactor', 'Find Bug', 'Explain', 'Generate'] as const;

	let newMessage = '';
	let loading = false;

	async function chat(event: Event) {

		event.preventDefault();
		loading = true;

		const messages = [
			...$messageLog[selectedTab],
			{ role: 'user', content: `${proompts[selectedTab]}\n\n${newMessage}` }
		] satisfies ChatMessage[];

		const res = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ messages })
		});

		const chatGPTMessage = await res.json();

		loading = false;

		messageLog.set({
			...$messageLog,
			[selectedTab]: [
				...$messageLog[selectedTab],
				chatGPTMessage satisfies ChatMessage[],
			]
		});
	}

	let selectedTab: typeof tabs[number] = 'Refactor';

	const switchTab = (newTab: number) => {
		selectedTab = tabs[newTab];
	};

	type Descriptions = {
    [tab in typeof tabs[number]]: {
			intro: string;
			placeholder: string;
			btnText: string;
		};
  };

	const descriptions: Descriptions = {
		Refactor: {
			intro: 'The refactor tool will improve your pasted code, to make it more readable, efficient, or maintainable.',
			placeholder: 'Paste your code to refactor here...',
			btnText: 'Improve!'
		},
		'Find Bug': {
			intro: 'The bug finding tool, will identify any issues that may be causing your code to fail, and suggest fixes.',
			placeholder: 'Paste your code to debug here...',
			btnText: 'Fix!'
		},
		'Explain': {
			intro: 'The code explainer tool, will attempt to explain what your code is doing, and how it works.',
			placeholder: 'Paste your code to generate an explanation of what\'s happening...',
			btnText: 'Explain!'
		},
		Generate: {
			intro: 'The generate tool, will generate code in your given language, based on your inputted prompt. You can also use this to generate code from a given example.',
			placeholder: 'Write a prompt to generate code from here...',
			btnText: 'Generate!'
		},
	};

	$: tabTxt = descriptions[selectedTab];

	$: answer = $messageLog[selectedTab].reverse().find(msg => msg.role === 'assistant')?.content;

</script>

<main>
	<!-- Heading -->
  <h1>Cheat_Code</h1>
	
	<!-- Short introduction -->
	<div class="description">
		<i class="desc-1">An AI-powered coding assistant, to generate, fix and improve code.</i>
		<i class="desc-2">Built as a demo of OpenAI's GPT API, using the code-davinci-002 model.</i>
		<a href="https://github.com/lissy93/cheat-code"><Icon name="github"/>github.com/lissy93/cheat-code</a>
	</div>

	<!-- List of tabs, to change tool behavior -->
	<div class="tab-selector">
		{#each tabs as tab, i} 
			<button on:click={()=> switchTab(i)} class:selected={tab === selectedTab} title={tabTxt.intro}>
				<Icon name={tab} width="24px" height="24px" />
				{tab}
			</button>
		{/each}
	</div>

	<!-- User input form, and submit button -->
	<div class="user-input">
		<div class="intro">{tabTxt.intro}</div>
		<textarea bind:value={newMessage} rows="5" placeholder={tabTxt.placeholder} />
		<div class="submit-btn">
			<button disabled={loading} on:click={chat}>
				{ loading ? 'Thinking...' : tabTxt.btnText}
			</button>
		</div>
	</div>

	<!-- Output -->
	{#if loading || answer}
		<div class="output" transition:slide>
			{#if loading }
				<h2>Loading</h2>
				<span class="loader"></span>
			{/if}
			{#if answer}
				<h2>Solution</h2>
				<div class="md-content">
					<SvelteMarkdown source={answer} />
				</div>
			{/if}
		</div>
	{/if}
</main>

<style lang="scss">
  main {
    background: var(--background);
    width: calc(90vw - 2rem);
		max-width: 1000px;
    min-height: 90vh;
    margin: 1rem auto;
    padding: 1rem 0;
		display: flex;
		flex-direction: column;
    h1 {
      margin: 0;
      font-size: 8ch;
      text-align: center;
      color: var(--foreground);
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
		.description {
			color: var(--foreground);
			margin: 2rem auto;
			text-align: center;
			font-size: 1.1rem;
			line-height: 1.6rem;
			display: flex;
			flex-direction: column;
			background: var(--inner-background);
			width: 100%;
			border-radius: var(--curve-factor);
			padding: 1rem 0;
			.desc-1 {
				font-size: 1.2rem;
				font-weight: 500;
				font-style: normal;
			}
			.desc-2 {
				opacity: 0.7;
			}
			a {
				color: var(--accent);
				font-weight: bold;
				display: flex;
				gap: 0.5rem;
				align-items: center;
				justify-content: center;
				text-decoration: none;
				transition: transform 0.2s ease;
				&:hover { transform: scale(1.03); }
			}
		}
		.intro {
			width: calc(100% - 2rem);
			box-sizing: border-box;
			margin: 1rem auto;
			padding: 0.5rem 1rem;
			border: 1px solid var(--greyish);
			border-radius: var(--curve-factor);
			color: var(--foreground);
			opacity: var(--dimming-amount);
		}
		.user-input {
			width: 100%;
			margin: 0;
			padding: 1rem 0;
			border-radius: 0 var(--curve-factor) var(--curve-factor);
			background: var(--inner-background);
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.submit-btn {
			background: var(--gradient);
			border-radius: var(--curve-factor);
			padding: 0.25rem;
			margin: 0.5rem auto;
			width: fit-content;
			transition: all 0.2s ease-in-out;
			button {
				font-size: 1.8rem;
				background: var(--background);
				color: var(--foreground);
				font-family: Sono;
				font-weight: 600;
				padding: 0.5rem 1rem;
				border: none;
				border-radius: var(--curve-factor);
				transition: all 0.2s ease-in-out;
				cursor: pointer;
				min-width: 12rem;
				&:disabled {
					cursor: not-allowed;
					opacity: 0.8;
				}
			}
			&:hover {
				background: var(--gradient-reverse);
				transform: scale(1.05);
				button {
					transform: scale(1.01);
				}
			}
		}
		textarea {
			background: var(--background);
			border-radius: var(--curve-factor);
			border: 1px solid var(--greyish);
			box-sizing: border-box;
			width: calc(100% - 2rem);
			height: 8rem;
			min-height: 4rem;
			max-height: 16rem;
			padding: 0.5rem 1rem;
			resize: vertical;
			color: var(--foreground);
			font-size: 1rem;
			transition: all 0.2s ease-in-out;
			&:focus, &:focus:hover, &:focus:active {
				border: 1px solid var(--accent);
				outline: none;
				box-shadow: 1px 4px 4px 2px var(--transparent-accent);
			}
			&:hover {
				box-shadow: 1px 1px 6px 1px var(--transparent-accent);
			}
		}
		.tab-selector {
			display: flex;
			gap: 0.5rem;
			border-radius: var(--curve-factor);
			margin: 0;
			button {
				background: var(--outer-background);
				color: var(--foreground);
				border-radius: var(--curve-factor) var(--curve-factor) 0 0;
				padding: 0.25rem 0.5rem;
				font-size: 1.5rem;
				margin: 0;
				cursor: pointer;
				border: 1px solid var(--greyish);
				border-width: 2px 2px 0 2px;
				transition: all 0.2s ease-in-out;
				font-family: Sono;
				display: flex;
				gap: 0.5rem;
				align-items: center;
				&.selected {
					background: var(--inner-background);
				}
				&:hover {
					color: var(--accent);
					:global(svg) {
						transform: scale(1.2) rotate(2.5deg);
					}
				}
			}
		}
		.output {
			width: calc(100% - 2rem);
			margin: 1rem 0;
			padding: 1rem 0;
			border-radius: var(--curve-factor);
			background: var(--inner-background);
			display: flex;
			flex-direction: column;
			padding: 1rem;
			h2 {
				color: var(--foreground);
				margin: 1rem auto;
				font-weight: 600;
				font-size: 2rem;
			}
			.md-content {
				background: var(--background);
				border-radius: var(--curve-factor);
				padding: 1rem 2rem;
				:global(p), :global(pre), :global(ul), :global(ol), :global(li) {
					color: var(--foreground);
					font-family: Sono;
				}
				:global(a) {
					color: var(--accent);
				}
				:global(pre) {
					border-left: 4px solid var(--accent);
					background: var(--transparent-accent);
					padding: 0.5rem 1.5rem 0.5rem 0.5rem;
					border-radius: var(--curve-factor);
				}
			}

			.loader {
				width: 16px;
				height: 16px;
				border-radius: 50%;
				background: var(--accent);
				position: relative;
				margin: 1rem auto;
			}
			.loader:before,
			.loader:after {
				content: "";
				position: absolute;
				border-radius: 50%;
				inset: 0;
				background: var(--foreground);
				transform: rotate(0deg) translate(30px);
				animation: rotate 1s ease infinite;
			}
			.loader:after {
				animation-delay: 0.5s
			}
			@keyframes rotate {
				100% {transform: rotate(360deg) translate(30px)
			}
					
			}
		}
  }

</style>
