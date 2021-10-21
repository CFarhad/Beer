<script>
  import './index.css';
  import './assets/css/bootstrap-icons.css'
  import PDF from './containers/pdf/index.svelte';
	import Error from './containers/error/index.svelte'
  import DeviceWidth from './containers/error/deviceWidth.svelte';

  const searchParams = new URLSearchParams(window.location.search);
  const file = searchParams.get('url');
  const mode = searchParams.get('mode');

  let deviceWidth = document.documentElement.offsetWidth;
  window.addEventListener('resize',(e)=>{
     deviceWidth = document.documentElement.offsetWidth;
  })

  if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark')
  localStorage.theme = 'dark';
} else {
  document.documentElement.classList.remove('dark');
  localStorage.removeItem('theme')
}

  
</script>



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