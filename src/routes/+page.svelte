<script>
	//----Main elements
	import P5Canvas from '$lib/components/sections/P5Canvas.svelte';
	import ColumnContent from '$lib/components/sections/ColumnContent.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	//----Content
	import TeamCarousel from '$lib/components/ui/TeamCarousel.svelte';
	import ProjectFeed from '$lib/components/ui/ProjectFeed.svelte';
	import TextSlot from '$lib/components/atoms/TextSlot.svelte';
	import List from '$lib/components/atoms/List.svelte';

	// Svelte 5 syntax to receive server data
	let { data } = $props();

	//---- Animations
	let scrollContainer = $state();

	function scrollToCanvas() {
		if (scrollContainer) {
			scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	// @ts-ignore
	function handleStripWheel(e) {
		if (e.deltaY < 0 && scrollContainer) {
			e.preventDefault();
			scrollToCanvas();
		}
	}
</script>

<P5Canvas phrase="IDBS" />
<div class="snap-wrapper" bind:this={scrollContainer}>
	<section class="snap-screen canvas-layer"></section>

	<section class="snap-screen content-layer">
		<button
			class="black-strip"
			onclick={scrollToCanvas}
			onwheel={handleStripWheel}
			aria-label="Back to canvas"
		>
		</button>
		<div class="home-grid">
			<!-- Column 1: Course Info & Team -->
			<ColumnContent --layout="1 / span 1" title="Course Presentation">
				<TextSlot>
					<p class="text-body-regular">
						{data.cms.courseDescription}
					</p>
				</TextSlot>
				<TeamCarousel professors={data.professors} tas={data.tas} variant="desktop" />
			</ColumnContent>

			<!-- Column 2: Projects Feed -->
			<ColumnContent --layout="2 / span 1" title="Student's Projects">
				<TextSlot>
					<p class="text-body-regular">
						{data.cms.themeDescription}
					</p>
				</TextSlot>
				<!-- Passing the projects prop here -->
				<ProjectFeed projects={data.projects} />
			</ColumnContent>

			<!-- Column 3: Materials & Links -->
			<ColumnContent --layout="3 / span 1" title="Course Materials & Tools">
				<TextSlot>
					<p class="text-body-regular">
						{data.cms.toolsDescription}
					</p>
				</TextSlot>
				<TextSlot title="Useful Links">
					<List lists={data.links} />
				</TextSlot>
				<TextSlot title="Bibliography">
					<List lists={data.biblio} />
				</TextSlot>
			</ColumnContent>
		</div>
		<div class="footer-wrapper">
			<Footer --color="black" />
		</div>
	</section>
</div>

<style>
	:global(body) {
		overflow: hidden; /* Impedisce scroll fuori dal nostro wrapper */
	}

	/* ------------------------------- */
	/* SCROLL SNAPPING MASTER */
	/* ------------------------------- */
	.snap-wrapper {
		height: 100vh;
		width: 100vw;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.snap-wrapper::-webkit-scrollbar {
		display: none;
	}

	.snap-screen {
		height: 100vh;
		width: 100vw;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	/* ------------------------------- */
	/* GESTIONE DEI DUE LIVELLI */
	/* ------------------------------- */
	.canvas-layer {
		pointer-events: none;
	}

	.content-layer {
		background-color: var(--bg, #ffffff);
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 10;
	}

	/* ------------------------------- */
	/* LA STRISCIA NERA INTERATTIVA */
	/* ------------------------------- */
	.black-strip {
		width: 100%;
		height: var(--space-s-m);
		background-color: var(--black, #000);
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background-color 0.3s ease;
	}
	.black-strip:hover {
		background-color: var(--black, #000);
	}

	/* ------------------------------- */
	/* MOBILE: Layout fluido */
	/* ------------------------------- */
	.home-grid {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-top: var(--space-m-l);
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}

	.footer-wrapper {
		flex-shrink: 0;
		height: auto;
	}

	/* ------------------------------- */
	/* DESKTOP: Colonne fisse indipendenti */
	/* ------------------------------- */
	@media (min-width: 860px) {
		.snap-wrapper {
			height: 100dvh;
		}

		.snap-wrapper {
			height: 100dvh;
		}

		.home-grid {
			display: grid;
			padding-top: 0;
			grid-template-rows: 1fr;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			overflow: hidden;
		}
	}
</style>
