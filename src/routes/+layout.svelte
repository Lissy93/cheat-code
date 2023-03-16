<script lang="ts">
  import '$/styles/typography.css';
  import Footer from '$/lib/Footer.svelte';
</script>

 <slot />

<Footer />

<style lang="scss">
  :global(:root) {
    --background: #0B1021;
    --foreground: #ffffff;
    --accent: #00CCB4;
    --curve-factor: 6px;
		--dimming-amount: 0.75;
		--greyish: #092935;
    --transparent-accent: #00CCB426;
    --inner-background: #141B33;
    --outer-background: #060913;
    --gradient: linear-gradient(90deg, var(--accent) 20%, #00C9FF 100%);
    --gradient-reverse: linear-gradient(120deg, var(--accent) 40%, #00C9FF 80%, var(--accent) 100%);

    // Old theme:
    // --background: #17151c;
    // --foreground: #ffffff;
    // --accent: #da22ff;
    // --curve-factor: 6px;
		// --dimming-amount: 0.75;
		// --greyish: #555555;
    // --transparent-accent: #da22ff26;
    // --inner-background: #1e1b27;
  }
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Sono';
    background: var(--background);
    transition: all ease-in-out 0.3s;
    overflow-x: hidden;
  }
  :global(::selection) {
    background: var(--accent);
    color: var(--foreground);
  }
</style>
