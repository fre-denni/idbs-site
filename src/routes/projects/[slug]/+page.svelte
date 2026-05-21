<script>
	import HeaderProject from '$lib/components/ui/HeaderProject.svelte';
	import HeroProject from '$lib/components/ui/HeroProject.svelte';
	import ContentDiv from '$lib/components/ui/ContentDiv.svelte';
	import TextSlot from '$lib/components/atoms/TextSlot.svelte';
	import IFrameProject from '$lib/components/ui/IFrameProject.svelte';
	import CarouselProject from '$lib/components/ui/CarouselProject.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	// airtable data
	let { data } = $props();
</script>

<HeaderProject />
<!-- AiRTABLE Content -->
<HeroProject />
<!-- Description -->
<ContentDiv --layout="1 / span 1" title="Project Description" open>
	<TextSlot>
		<p class="text-body-regular">
			{data}
		</p>
	</TextSlot>
</ContentDiv>
<!-- Images -->
<CarouselProject />
<!-- Cards -->
<IFrameProject />
<!-- Video -->
<IFrameProject />
<Footer --color="var(--bg, #fff)" />

<style>
</style>
