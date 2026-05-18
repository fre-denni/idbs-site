<script>
	//imports
	//----Main elements
	//import P5Canvas from '$lib/components/sections/P5Canvas.svelte';
	import ColumnContent from '$lib/components/sections/ColumnContent.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	//----Content
	import TeamCarousel from '$lib/components/ui/TeamCarousel.svelte';
	import ProjectFeed from '$lib/components/ui/ProjectFeed.svelte';
	import TextSlot from '$lib/components/atoms/TextSlot.svelte';

	// FIX 1: Point to the correct filenames
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

<!--P5Canvas phrase="IDBS" /-->
<!--Footer --color="white" /-->
<div class="page-wrapper">
	<div class="home-grid">
		<ColumnContent --layout="1 / span 1" title="Course Presentation" open>
			<TextSlot>
				<p class="text-body-regular">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
					quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
					adipisci. Officiis quas eum delectus facilis.
				</p>
			</TextSlot>
			<TeamCarousel {professors} {tas} variant="desktop" />
		</ColumnContent>

		<ColumnContent --layout="2 / span 1" title="Student's Projects">
			<TextSlot>
				<p class="text-body-regular">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
					quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
					adipisci. Officiis quas eum delectus facilis.
				</p>
			</TextSlot>
			<ProjectFeed />
		</ColumnContent>

		<ColumnContent --layout="3 / span 1" title="Course Materials & Tools">
			<TextSlot>
				<p class="text-body-regular">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
					quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
					adipisci. Officiis quas eum delectus facilis.
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
					<li><a href="http://" target="_blank" rel="noopener noreferrer">Lesson's slides</a></li>
				</ul>
			</TextSlot>
			<TextSlot title="Bibliography">
				<p class="text-body-regular">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente,
					quisquam non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim
					adipisci. Officiis quas eum delectus facilis.
				</p>
			</TextSlot>
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
