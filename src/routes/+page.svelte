<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import { slide } from 'svelte/transition';
  import Icon from '$/lib/Icon.svelte';
  import type { ChatMessage, TabDescription } from '$/types/chat.types';
  import { proompts } from '$/data/proompts';
  import { messageLog } from '$/data/MessageLogStore';
  import { descriptions } from '$/data/TabDescriptions';
  import '$/styles/really-bad-styles.scss';

  const tabs = ['Refactor', 'Find Bug', 'Explain', 'Generate'] as const;

  let newMessage = '';
  let loading = false;

  const chat = async (event: Event) => {
    event.preventDefault();
    loading = true;

    const messages = [
      ...$messageLog[selectedTab],
      { role: 'user', content: `${proompts[selectedTab]}\n\n${newMessage}` },
    ] satisfies ChatMessage[];

    const chatGPTMessage = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    }).then((res) => res.json() as Promise<{ messages: ChatMessage[] }>);

    loading = false;

    messageLog.set({
      ...$messageLog,
      [selectedTab]: [
        ...$messageLog[selectedTab],
        chatGPTMessage satisfies ChatMessage[],
      ],
    });
  };

  let selectedTab: typeof tabs[number] = 'Refactor';

  const switchTab = (newTab: number) => {
    selectedTab = tabs[newTab];
  };

  $: tabTxt = descriptions[selectedTab];

  $: answer = $messageLog[selectedTab]
    .reverse()
    .find((msg) => msg.role === 'assistant')?.content;
</script>

<main>
  <!-- Heading -->
  <h1>Cheat_Code</h1>

  <!-- Short introduction -->
  <div class="description">
    <i class="desc-1"
      >An AI-powered coding assistant, to generate, fix and improve code.</i
    >
    <i class="desc-2"
      >Built as a demo of OpenAI's GPT API, using the code-davinci-002 model.</i
    >
    <a href="https://github.com/lissy93/cheat-code"
      ><Icon name="github" />github.com/lissy93/cheat-code</a
    >
  </div>

  <!-- List of tabs, to change tool behavior -->
  <div class="tab-selector">
    {#each tabs as tab, i}
      <button
        on:click={() => switchTab(i)}
        class:selected={tab === selectedTab}
        title={tabTxt.intro}
      >
        <Icon name={tab} width="24px" height="24px" />
        {tab}
      </button>
    {/each}
  </div>

  <!-- User input form, and submit button -->
  <div class="user-input">
    <div class="intro">{tabTxt.intro}</div>
    <textarea
      bind:value={newMessage}
      rows="5"
      placeholder={tabTxt.placeholder}
    />
    <div class="submit-btn">
      <button disabled={loading} on:click={chat}>
        {loading ? 'Thinking...' : tabTxt.btnText}
      </button>
    </div>
  </div>

  <!-- Output -->
  {#if loading || answer}
    <div class="output" transition:slide>
      {#if loading}
        <h2>Loading</h2>
        <span class="loader" />
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
  
</style>
