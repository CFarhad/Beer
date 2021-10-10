import App from './App.svelte';

const Beer = new App({
	target: document.body,
	props: {
		name: 0
	}
});

export default Beer;