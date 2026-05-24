<script>
	import HeaderProject from '$lib/components/ui/HeaderProject.svelte';
	import HeroProject from '$lib/components/ui/HeroProject.svelte';
	import IFrameProject from '$lib/components/ui/IFrameProject.svelte';
	import CarouselProject from '$lib/components/ui/CarouselProject.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	let { data } = $props();
</script>

<div class="container">
	<div class="content">
		<HeaderProject />
		<HeroProject project={data.project} />

		<CarouselProject title="Project pictures" images={data.project.gallery} />

		<IFrameProject />
		<IFrameProject />
		<IFrameProject />
	</div>

	<Footer --color="var(--bg, #fff)" />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background-color: var(--black, #000);

		/* FONDAMENTALE: impedisce lo scrolling orizzontale dell'intera pagina */
		overflow-x: hidden;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s-m);

		/* FONDAMENTALE: Usiamo max-width al posto di width pura per non sforare mai su mobile */
		width: 100%;
		max-width: clamp(24rem, 18.9231rem + 24.2308vw, 48rem);

		/* Include il padding nel calcolo della larghezza */
		box-sizing: border-box;
		padding: var(--space-l-xl) var(--space-2xs-xs);
	}
</style>
