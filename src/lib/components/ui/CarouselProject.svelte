<script>
	import Image from '../atoms/Image.svelte';
	let { title, images = [] } = $props();
</script>

{#if images.length > 0}
	<div class="carousel">
		<div class="title">
			<h2 class="text-subtitles-semibold">{title}</h2>
		</div>
		<div class="images">
			<div class="track">
				{#each images as img, i (i)}
					<div class="img">
						<Image src={img} alt="Project picture {i + 1}" />
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.carousel {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-2xs-xs);
		padding-bottom: var(--space-m-l);
		width: 100%;
		position: relative;
		color: var(--bg, #fff);
	}

	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		word-break: break-word;
		flex-shrink: 0;
	}

	/* Contenitore con scroll orizzontale */
	.images {
		width: 100%;
		overflow-x: auto;
		overflow-y: clip;
		scrollbar-width: none; /* Nasconde la scrollbar su Firefox */
		-ms-overflow-style: none; /* Nasconde la scrollbar su IE/Edge */
		-webkit-overflow-scrolling: touch;
		scroll-snap-type: x mandatory; /* Per uno slide morbido stile app */
		border-radius: var(--space-3xs-2xs);
		border: 1px solid var(--img-border-dark);
	}

	.images::-webkit-scrollbar {
		display: none;
	}

	.track {
		display: flex;
		gap: var(--space-2xs-xs);
		align-items: flex-start;
	}

	.img {
		position: relative;
		/* Diamo una larghezza. flex: 0 0 85% fa sì che si veda sempre un pezzo della foto successiva, invitando a scrollare */
		flex: 0 0 80%;
		max-width: 500px; /* Evita che diventi gigantesca su schermi grandi */
		aspect-ratio: 4 / 3; /* Proporzione delle foto */
		scroll-snap-align: center; /* Allinea la foto al centro quando si scrolla */
		border-radius: var(--space-3xs-2xs);
		overflow: hidden; /* Taglia fuori i bordi se l'immagine esce */
	}

	.img :global(img) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
	}
</style>
