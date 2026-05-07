<script>
	import HeaderProject from '$lib/components/ui/HeaderProject.svelte';
	import HeroProject from '$lib/components/ui/HeroProject.svelte';
	import ContentDiv from '$lib/components/ui/ContentDiv.svelte';
	import IFrameProject from '$lib/components/ui/IFrameProject.svelte';
	import CarouselProject from '$lib/components/ui/CarouselProject.svelte';

	// Add script for airtable Content
</script>

<!-- Posso forse aggiungere l'eader come parte del layout dei progetti? -->
<HeaderProject />

<!-- AiRTABLE Content -->
<HeroProject />
<!-- Description -->
<ContentDiv />
<!-- Images -->
<CarouselProject />
<!-- Cards -->
<IFrameProject />
<!-- Video -->
<IFrameProject />
