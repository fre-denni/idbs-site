<script>
	//imports

	//----Main elements
	//import P5Canvas from '$lib/components/sections/P5Canvas.svelte';
	import ColumnContent from '$lib/components/sections/Column-Content.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	//----Content
	import TeamCarousel from '$lib/components/ui/TeamCarousel.svelte';
	import ProjectFeed from '$lib/components/ui/ProjectFeed.svelte';
</script>

<!--P5Canvas phrase="IDBS" /-->
<!--Footer --color="white" /-->
<div class="page-wrapper">
	<div class="home-grid">
		<ColumnContent --layout="1 / span 1" title="Course Presentation" open>
			<p class="text-body-regular">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
				quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
				adipisci. Officiis quas eum delectus facilis.
			</p>
			<TeamCarousel />
		</ColumnContent>
		<ColumnContent --layout="2 / span 1" title="Student's Projects">
			<p class="text-body-regular">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
				quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
				adipisci. Officiis quas eum delectus facilis.
			</p>
			<ProjectFeed />
		</ColumnContent>

		<ColumnContent --layout="3 / span 1" title="Course Materials & Tools">
			<p class="text-body-regular">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
				quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
				adipisci. Officiis quas eum delectus facilis.
			</p>
			<h2 class="text-subtitles-semibold">Useful links</h2>
			<p class="text-body-regular">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
				quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
				adipisci. Officiis quas eum delectus facilis.
			</p>
			<h2 class="text-subtitles-semibold">Bibliography</h2>
			<p class="text-body-regular">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
				quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
				adipisci. Officiis quas eum delectus facilis.
			</p>
		</ColumnContent>
	</div>
	<div class="footer-wrapper">
		<Footer --color="black" />
	</div>
</div>

<style>
	/* ------------------------------- */
	/* STRUTTURA MASTER DELLA PAGINA */
	/* ------------------------------- */
	.page-wrapper {
		display: flex;
		flex-direction: column;
		height: 100dvh; /* Blocchiamo rigorosamente all'altezza della viewport */
		overflow: hidden; /* Impedisce alla pagina intera di scrollare */
	}

	/* ------------------------------- */
	/* MOBILE: Layout fluido */
	/* ------------------------------- */
	.home-grid {
		display: flex;
		flex-direction: column; /* Su mobile meglio flex column per lo stack */
		width: 100%;
		padding-top: 1.75rem;
		flex: 1; /* Prende tutto lo spazio disponibile */
		min-height: 0; /* TRUCCO FONDAMENTALE: impedisce di sfondare il contenitore */
		overflow-y: auto; /* Su mobile è l'intera griglia a scrollare */
	}

	.footer-wrapper {
		flex-shrink: 0; /* Il footer non deve MAI rimpicciolirsi o farsi schiacciare */
		height: auto; /* Prende l'altezza che gli serve in base ai tuoi padding */
	}

	/* ------------------------------- */
	/* DESKTOP: Colonne fisse indipendenti */
	/* ------------------------------- */
	@media (min-width: 768px) {
		.home-grid {
			display: grid;
			padding-top: 0;
			grid-template-rows: 1fr; /* Una singola riga che prende tutta l'altezza */
			grid-template-columns: repeat(3, minmax(0, 1fr));
			overflow: hidden; /* Blocca lo scroll del contenitore: ci penseranno le singole colonne */
		}
	}
</style>
