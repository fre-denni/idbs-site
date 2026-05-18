<script>
	//imports
	//----Main elements
	import P5Canvas from '$lib/components/sections/P5Canvas.svelte';
	import ColumnContent from '$lib/components/sections/ColumnContent.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	//----Content
	import TeamCarousel from '$lib/components/ui/TeamCarousel.svelte';
	import ProjectFeed from '$lib/components/ui/ProjectFeed.svelte';
	import TextSlot from '$lib/components/atoms/TextSlot.svelte';

	//---- Animations
	// Referenza al div che gestisce lo scroll
	let scrollContainer = $state();

	// Funzione per tornare al canvas in cima
	function scrollToCanvas() {
		if (scrollContainer) {
			// @ts-ignore
			scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	// Cattura lo scorrimento specifico sulla striscia nera
	// @ts-ignore
	function handleStripWheel(e) {
		// deltaY < 0 significa scorrimento verso l'alto
		if (e.deltaY < 0 && scrollContainer) {
			e.preventDefault(); // Previene il comportamento base
			scrollToCanvas();
		}
	}

	//---- Images
	import mauro from '$lib/assets/photos/mauro.png';
	import paolo from '$lib/assets/photos/paolo.png';
	import fede from '$lib/assets/photos/fede.png';
	import cecilia from '$lib/assets/photos/cecilia.png';

	//--- team
	const professors = [
		{
			image: mauro,
			name: 'Mauro Ceconello',
			linkedin: 'https://www.linkedin.com/in/mauro-ceconello/',
			mail: 'mauro.ceconello@polimi.it'
		},
		{
			image: paolo,
			name: 'Paolo Perego',
			linkedin: 'https://www.linkedin.com/in/paolo-perego-538b1a15/',
			mail: 'paolo.perego@polimi.it'
		}
	];

	const tas = [
		{
			image: fede,
			name: 'Federico Denni',
			linkedin: 'https://www.linkedin.com/in/federico-denni/',
			mail: 'federico.denni@polimi.it'
		},
		{
			image: cecilia,
			name: 'Cecilia Ferrentino',
			linkedin: 'https://www.linkedin.com/in/cecilia-ferrentino-398147341/',
			mail: 'cecilia.ferrentino@mail.polimi.it'
		}
	];
</script>

<P5Canvas phrase="IDBS" />
<!-- Il contenitore principale che gestisce lo scroll magnetico -->
<div class="snap-wrapper" bind:this={scrollContainer}>
	<!-- SCREEN 1: Vuoto e trasparente. Fa da "finestra" per il canvas fisso sotto -->
	<section class="snap-screen canvas-layer"></section>

	<!-- SCREEN 2: Il tuo contenuto. Scivola sopra il canvas -->
	<section class="snap-screen content-layer">
		<!-- La striscia nera superiore -->
		<button
			class="black-strip"
			onclick={scrollToCanvas}
			onwheel={handleStripWheel}
			aria-label="Torna al canvas"
		>
			<!-- Opzionale: potresti inserire una piccola icona SVG o un trattino bianco qui -->
		</button>
		<div class="home-grid">
			<ColumnContent --layout="1 / span 1" title="Course Presentation" open>
				<TextSlot>
					<p class="text-body-regular">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
						quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit
						enim adipisci. Officiis quas eum delectus facilis.
					</p>
				</TextSlot>
				<TeamCarousel {professors} {tas} variant="desktop" />
			</ColumnContent>

			<ColumnContent --layout="2 / span 1" title="Student's Projects">
				<TextSlot>
					<p class="text-body-regular">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
						quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit
						enim adipisci. Officiis quas eum delectus facilis.
					</p>
				</TextSlot>
				<ProjectFeed />
			</ColumnContent>

			<ColumnContent --layout="3 / span 1" title="Course Materials & Tools">
				<TextSlot>
					<p class="text-body-regular">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
						quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit
						enim adipisci. Officiis quas eum delectus facilis.
					</p>
				</TextSlot>
				<TextSlot title="Useful Links">
					<ul class="links">
						<li>
							<a href="https://idbs-cards.vercel.app/" target="_blank" rel="noopener noreferrer"
								>Cards Tool</a
							>
						</li>
						<li><a href="http://" target="_blank" rel="noopener noreferrer">Miro Boards</a></li>
						<li>
							<a href="http://" target="_blank" rel="noopener noreferrer">Lesson's slides</a>
						</li>
					</ul>
				</TextSlot>
				<TextSlot title="Bibliography">
					<p class="text-body-regular">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
						quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit
						enim adipisci. Officiis quas eum delectus facilis.
					</p>
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
		height: 100dvh;
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
		height: 100dvh;
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
		background-color: var(--White, #ffffff);
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
		height: 1.5rem;
		background-color: var(--Black, #000);
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background-color 0.3s ease;
	}
	.black-strip:hover {
		background-color: #222;
	}

	/* ------------------------------- */
	/* MOBILE: Layout fluido */
	/* ------------------------------- */
	.home-grid {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-top: 1.75rem;
		flex: 1; /* Prende tutto lo spazio RIMANENTE sotto la striscia nera */
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
	@media (min-width: 768px) {
		.home-grid {
			display: grid;
			padding-top: 0;
			grid-template-rows: 1fr;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			overflow: hidden;
		}
	}
</style>
