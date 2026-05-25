<script>
	import HeaderProject from '$lib/components/ui/HeaderProject.svelte';
	import HeroProject from '$lib/components/ui/HeroProject.svelte';
	import IFrameProject from '$lib/components/ui/IFrameProject.svelte';
	import CarouselProject from '$lib/components/ui/CarouselProject.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	let { data } = $props();
</script>

{#if data?.project}
	<div class="container">
		<div class="content">
			<HeaderProject />

			<HeroProject project={data.project} />

			<CarouselProject title="Project pictures" images={data.project.gallery} />
			<IFrameProject
				title="Cards"
				link="https://idbs-cards-app.vercel.app/embed.html?group={data.project.group}"
			/>
			<IFrameProject title="Project Video" link={data.project.videoUrl} />
			<IFrameProject title="Project Report" link={data.project.reportUrl} />
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
		padding: var(--space-l-xl) var(--space-2xs-xs) 0 var(--space-3xl-4xl);
		padding-bottom: 2rem;
	}
</style>
