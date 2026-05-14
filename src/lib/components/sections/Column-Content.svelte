<script>
	import ContentDiv from '../ui/ContentDiv.svelte';
	let { title, open = false, children } = $props();
</script>

<div class="column" class:open>
	<ContentDiv {title} bind:open>
		{@render children()}
	</ContentDiv>
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-self: stretch;
		justify-self: stretch;
		border-bottom: 1.5px solid var(--Black, #000);
		border-right: none;
		grid-row: var(--layout);
		grid-column: 1 / span 1;
	}

	@media (min-width: 768px) {
		.column {
			padding-top: 0.75rem;
			border-bottom: none;
			border-right: 1.5px solid var(--Black, #000);
			grid-row: 1 / span 1;
			grid-column: var(--layout);
		}
	}
</style>
