<script>
	import HeaderProject from '$lib/components/ui/HeaderProject.svelte';
	import HeroProject from '$lib/components/ui/HeroProject.svelte';
	import IFrameProject from '$lib/components/ui/IFrameProject.svelte';
	import CarouselProject from '$lib/components/ui/CarouselProject.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	let { data } = $props();
</script>

<!-- <div
	style="background: black; color: lime; padding: 20px; position: relative; z-index: 9999; width: 100%; font-family: monospace; overflow-x: auto;"
>
	<h3>DEBUG DATI SERVER:</h3>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div> -->

{#if data?.project}
	<div class="container">
		<div class="content">
			<HeaderProject />

			<HeroProject project={data.project} />

			<CarouselProject title="Project pictures" images={data.project.gallery} />

			<IFrameProject title="Project Video" link={data.project.videoUrl} />
			<!-- <IFrameProject title="Project Report" link={data.project.reportUrl} />
			<IFrameProject title="Interactive Prototype" link={websiteUrl} /> -->
		</div>

		<Footer --color="var(--bg, #fff)" />
	</div>
{:else}
	<div class="container" style="justify-content: center;">
		<h1 style="color: white;">Caricamento progetto o dati non trovati...</h1>
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		height: 100dvh;

		background-color: var(--black, #000);
		overflow-x: hidden;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s-m);
		width: 100%;
		max-width: clamp(24rem, 18.9231rem + 24.2308vw, 48rem);
		box-sizing: border-box;
		padding: var(--space-l-xl) var(--space-2xs-xs) var(--space-3xl-4xl);
	}
</style>
