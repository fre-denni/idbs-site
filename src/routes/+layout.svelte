<script>
	import favicon from '$lib/assets/favicon.svg';
	//import og-image
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- Add other metadata tags + SCHEMA-->
</svelte:head>

{@render children()}

<style>
	@import '/src/shared.css'; /*** variables ***/
</style>
