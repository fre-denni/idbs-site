<script>
	import HeaderProject from '$lib/components/ui/HeaderProject.svelte';
	import HeroProject from '$lib/components/ui/HeroProject.svelte';
	import IFrameProject from '$lib/components/ui/IFrameProject.svelte';
	import CarouselProject from '$lib/components/ui/CarouselProject.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	// airtable data
	let { data } = $props();
</script>

<div class="container">
	<div class="content">
		<HeaderProject />
		<!-- AiRTABLE Content -->
		<HeroProject project={data.project} />
		<div class="content">
			<!-- Images -->
			<CarouselProject title="Project pictures" images={data.project.gallery} />
			<!-- Cards -->
			<IFrameProject />
			<!-- Video -->
			<IFrameProject />
			<!-- Pdf -->
			<IFrameProject />
		</div>
	</div>
	<Footer --color="var(--bg, #fff)" />
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		padding: 0 var(--space-2xs-xs);
		flex-direction: column;
		align-items: center;
		background-color: var(--black, #000);
		overflow: scroll;
	}
	.content {
		display: flex;
		width: clamp(24rem, 18.9231rem + 24.2308vw, 48rem);
		padding: var(--space-l-xl);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s-m);
		align-self: stretch;
	}
</style>
