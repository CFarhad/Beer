<script>
  import './index.css';
  import './assets/css/bootstrap-icons.css';
  import PDF from './containers/pdf/index.svelte';
  import Error from './containers/error/index.svelte';

  const searchParams = new URLSearchParams(window.location.search);
  const file = searchParams.get('url');
  const mode = searchParams.get('mode');


  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }

  // funy message
  console.log("%cFOR EVER OR NEVER","color:#4F46E5;font-size:72px;-webkit-text-stroke: 2px black")
</script>


{#if mode === 'pdf'}
  <PDF {file} />
{:else if mode === 'image'}
  hi
{:else}
  <Error />
{/if}
