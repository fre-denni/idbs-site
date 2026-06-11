<script>
	let { link, title = 'Project Content' } = $props();

	let embedUrl = $derived.by(() => {
		if (!link || typeof link !== 'string') return '';

		try {
			// 1. YOUTUBE: Usiamo youtube-nocookie.com invece di youtube.com
			const ytMatch = link.match(
				/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
			);
			if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;

			// 2. FIX VIMEO: Catturiamo l'ID e l'eventuale hash segreto
			// Cerca pattern come vimeo.com/123456789 oppure vimeo.com/123456789/abcdef1234
			const vimeoMatch = link.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\w]+))?/);
			if (vimeoMatch) {
				const videoId = vimeoMatch[1];
				const hash = vimeoMatch[2]; //Code "unlisted"

				// Se c'è l'hash segreto, lo aggiungiamo all'URL dell'embed con ?h=
				return hash
					? `https://player.vimeo.com/video/${videoId}?h=${hash}`
					: `https://player.vimeo.com/video/${videoId}`;
			}

			// 3. Normal Links
			const gDriveMatch = link.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
			if (gDriveMatch) return `https://drive.google.com/file/d/${gDriveMatch[1]}/preview`;

			return link;
		} catch (e) {
			console.warn("Errore durante l'elaborazione del link iframe:", e);
			return link;
		}
	});
</script>

{#if embedUrl}
	<div class="iframe-project">
		<h2 class="text-subtitles-semibold">{title}</h2>
		<div class="iframe-wrapper">
			<iframe
				src={embedUrl}
				{title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>
{/if}

<style>
	.iframe-project {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs-s);
		padding-bottom: var(--space-m-l);
		width: 100%;
		color: var(--bg, #fff); /* Usa la tua variabile --bg con fallback bianco */
	}

	.iframe-wrapper {
		position: relative;
		width: 100%;
		/* Manteniamo fisso il 16:9 per tutto */
		aspect-ratio: 16 / 9;
		border-radius: var(--space-3xs-2xs);
		overflow: hidden;
		/* Un leggero colore di sfondo per evitare "buchi" se il sito impiega 1 secondo a caricare */
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--img-border-dark);
	}

	.iframe-wrapper iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
