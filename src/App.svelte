<script>
  import './assets/css/tailwind.css';
  import PDF from './containers/pdf/index.svelte';
	import Error from './containers/error/index.svelte'

  const searchParams = new URLSearchParams(window.location.search);
  const file = searchParams.get('url');
  const mode = searchParams.get('mode');
</script>

<main>
  {#if mode === 'pdf'}
    <PDF />
	{:else if mode === 'image'}
		hi
  {:else}
    <Error />
  {/if}
</main>
