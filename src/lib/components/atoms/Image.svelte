<script>
	let { src, alt, width = 828, class: className = '' } = $props();
	let optimizedSrc = $derived(
		src ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75` : ''
	);
</script>

{#if src}
	<img src={optimizedSrc} {alt} class={className} loading="lazy" decoding="async" />
{/if}
