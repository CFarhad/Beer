<script>
  import './index.css';
  import './assets/css/bootstrap-icons.css'
  import PDF from './containers/pdf/index.svelte';
	import Error from './containers/error/index.svelte'
  import DeviceWidth from './containers/error/deviceWidth.svelte';
  import {Provider} from 'svelte-reedux'
  import configStore from './store/store'


  const searchParams = new URLSearchParams(window.location.search);
  const file = searchParams.get('url');
  const mode = searchParams.get('mode');

  const store = configStore();

  let deviceWidth = document.documentElement.offsetWidth;
  window.addEventListener('resize',(e)=>{
     deviceWidth = document.documentElement.offsetWidth;
  })
</script>


<Provider store={store}>
  {#if deviceWidth < 850}
    <DeviceWidth />
  {:else}
    {#if mode === 'pdf'}
      <PDF file={file} />
    {:else if mode === 'image'}
      hi
    {:else}
      <Error />
    {/if}
  {/if}
</Provider>
