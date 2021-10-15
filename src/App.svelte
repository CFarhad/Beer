<script>
  import PDF from './containers/pdf/index.svelte';
	import Error from './containers/error/index.svelte'
  import {Provider} from 'svelte-reedux'
  import configStore from './store/store'


  const searchParams = new URLSearchParams(window.location.search);
  const file = searchParams.get('url');
  const mode = searchParams.get('mode');

  const store = configStore();
</script>


<Provider store={store}>
  {#if mode === 'pdf'}
    <PDF file={file} />
	{:else if mode === 'image'}
		hi
  {:else}
    <Error />
  {/if}
</Provider>
