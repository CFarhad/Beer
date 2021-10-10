<script>
	const searchParams = new URLSearchParams(window.location.search);
	const file = searchParams.get('url');
	let num = 0
</script>
<main>

	<button on:click={()=>num++}>hi</button>
	{num}

</main>