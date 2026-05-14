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
<div class="home-grid">
	<ColumnContent --layout="1 / span 1" title="Course Presentation" open>
		<p class="text-body-regular">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente, quisquam
			non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim adipisci.
			Officiis quas eum delectus facilis.
		</p>
		<TeamCarousel />
	</ColumnContent>
	<ColumnContent --layout="2 / span 1" title="Student's Projects">
		<p class="text-body-regular">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente, quisquam
			non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim adipisci.
			Officiis quas eum delectus facilis.
		</p>
		<ProjectFeed />
	</ColumnContent>

	<ColumnContent --layout="3 / span 1" title="Course Materials & Tools">
		<p class="text-body-regular">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente, quisquam
			non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim adipisci.
			Officiis quas eum delectus facilis.
		</p>
		<h2 class="text-subtitles-semibold">Useful links</h2>
		<p class="text-body-regular">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente, quisquam
			non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim adipisci.
			Officiis quas eum delectus facilis.
		</p>
		<h2 class="text-subtitles-semibold">Bibliography</h2>
		<p class="text-body-regular">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Id necessitatibus sapiente, quisquam
			non facilis dolorum illum voluptas, suscipit consequuntur iure ipsum ea odit enim adipisci.
			Officiis quas eum delectus facilis.
		</p>
	</ColumnContent>
</div>
<Footer --color="black" />

<style>
	.home-grid {
		display: inline-grid;
		align-self: stretch;
		grid-template-rows: repeat(3, fit-content(100%));
		grid-template-columns: repeat(1, minmax(0, 1fr));
		padding-top: 1.75rem;
	}

	@media (min-width: 768px) {
		.home-grid {
			padding-top: 0;
			display: grid;
			flex: 1 0 0;
			align-self: stretch;
			grid-template-rows: repeat(1, minmax(0, 1fr));
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
