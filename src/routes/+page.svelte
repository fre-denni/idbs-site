<script>
	import ColumnContent from '$lib/components/sections/Column-Content.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import P5Canvas from '$lib/components/sections/P5Canvas.svelte';

	// add canvas with p5.js (external component?)
	// add footer
	// add column content
</script>

<h1>IDBS</h1>

<P5Canvas />
<div class="home-grid">
	<ColumnContent />
	<ColumnContent />
	<ColumnContent />
</div>
<Footer />

<style>
	/*** Add styles for home-grid and media query*/
</style>
