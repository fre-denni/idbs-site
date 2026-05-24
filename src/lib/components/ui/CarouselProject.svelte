<script>
	import Image from '../atoms/Image.svelte';

	let { title, images = [] } = $props();

	// Questa funzione prende il controllo del <div> appena viene creato sulla pagina
	// @ts-ignore
	function draggable(node) {
		let isDown = false;
		// @ts-ignore
		let startX;
		// @ts-ignore
		let scrollLeft;

		// Aggiungiamo dinamicamente l'accessibilità
		node.tabIndex = 0;
		node.setAttribute('role', 'region');
		node.setAttribute('aria-label', 'Scrollable images');

		// @ts-ignore
		function mousedown(e) {
			isDown = true;
			node.classList.add('active'); // Aggiungiamo la classe
			startX = e.pageX - node.offsetLeft;
			scrollLeft = node.scrollLeft;
		}

		function mouseleave() {
			isDown = false;
			node.classList.remove('active');
		}

		function mouseup() {
			isDown = false;
			node.classList.remove('active');
		}

		// @ts-ignore
		function mousemove(e) {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - node.offsetLeft;
			// @ts-ignore
			const walk = (x - startX) * 2;
			// @ts-ignore
			node.scrollLeft = scrollLeft - walk;
		}

		// Attacchiamo gli eventi "dietro le quinte"
		node.addEventListener('mousedown', mousedown);
		node.addEventListener('mouseleave', mouseleave);
		node.addEventListener('mouseup', mouseup);
		node.addEventListener('mousemove', mousemove);

		// Funzione di pulizia quando il componente viene distrutto
		return {
			destroy() {
				node.removeEventListener('mousedown', mousedown);
				node.removeEventListener('mouseleave', mouseleave);
				node.removeEventListener('mouseup', mouseup);
				node.removeEventListener('mousemove', mousemove);
			}
		};
	}
</script>

{#if images.length > 0}
	<section class="carousel" aria-label="Carousel: {title}">
		<div class="title" aria-hidden="true">
			<h2 class="text-subtitles-semibold">
				{title}{images.length > 1 ? ' (Scroll \u2192)' : ''}
			</h2>
		</div>

		<div class="images" use:draggable>
			<div class="track" role="list">
				{#each images as img, i (i)}
					<div class="img" role="listitem" class:single={images.length === 1}>
						<Image src={img} alt="Project picture {i + 1}" />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.carousel {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-2xs-xs);
		padding-bottom: var(--space-m-l);
		width: 100%;
		min-width: 0;
		max-width: 100%;
		box-sizing: border-box;
		position: relative;
		color: #fff;
	}

	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		word-break: break-word;
		flex-shrink: 0;
	}

	.images {
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
		-webkit-overflow-scrolling: touch;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		cursor: grab;
		outline: none;
	}

	.images:focus-visible {
		outline: 2px solid var(--primary-color, #fff);
		outline-offset: 4px;
		border-radius: var(--space-3xs-2xs);
	}

	.images::-webkit-scrollbar {
		display: none;
	}

	:global(.images.active) {
		cursor: grabbing;
		scroll-snap-type: none;
		scroll-behavior: auto;
	}

	.track {
		display: flex;
		gap: var(--space-2xs-xs);
		align-items: flex-start;
	}

	.img {
		position: relative;
		flex: 0 0 95%;
		max-width: 650px;
		aspect-ratio: 4 / 3;
		scroll-snap-align: center;
		border-radius: var(--space-3xs-2xs);
		overflow: hidden;
		user-select: none;
		-webkit-user-drag: none;
	}

	.img.single {
		flex: 0 0 100%;
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
