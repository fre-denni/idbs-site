<script>
	import { dev } from '$app/environment';
	let { src, alt, width = 828, class: className = '' } = $props();
	let optimizedSrc = $derived(
		src
			? dev
				? // In locale usiamo l'immagine originale
					src
				: // In produzione usiamo l'ottimizzatore di Vercel
					`/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75`
			: ''
	);
</script>

{#if src}
	<img src={optimizedSrc} {alt} class={className} loading="lazy" decoding="async" />
{/if}
