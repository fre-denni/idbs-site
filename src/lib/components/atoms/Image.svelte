<script>
	let { src, alt, width = 828, class: className = '' } = $props();

	// Codifichiamo l'URL di Airtable e lo passiamo all'ottimizzatore di Vercel
	// w = larghezza desiderata (Vercel la farà matchare con le 'sizes' del config)
	// q = qualità (75 è l'ideale per il web)
	let optimizedSrc = $derived(
		src ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75` : ''
	);
</script>

{#if src}
	<img src={optimizedSrc} {alt} class={className} loading="lazy" decoding="async" />
{/if}
