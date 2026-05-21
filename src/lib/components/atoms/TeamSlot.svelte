<script>
	import TeamCards from './TeamCards.svelte';

	let { title, members = [], scrollable = false } = $props();
</script>

<div class="slot" class:no-scroll={!scrollable}>
	<p class="slot-title text-body-regular">
		{title}{scrollable ? ' (Scroll →)' : ''}
	</p>
	<div
		class="carousel"
		class:scrollable
		style="grid-template-columns: repeat({members.length}, fit-content(100%));"
	>
		{#each members as m (m.name)}
			<TeamCards {...m} />
		{/each}
	</div>
</div>

<style>
	.slot {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		position: relative;
		flex-shrink: 0;
	}

	.slot.no-scroll {
		overflow: clip;
	}

	.slot-title {
		min-width: 100%;
		width: min-content;
		margin: 0 0 var(--space-2xs-xs) 0;
		position: relative;
		flex-shrink: 0;
	}

	.carousel {
		display: inline-grid;
		grid-auto-rows: fit-content(100%);
		column-gap: var(--space-xs-s);
		position: relative;
		flex-shrink: 0;
	}

	.carousel.scrollable {
		overflow-x: auto;
		overflow-y: clip;
	}
</style>
