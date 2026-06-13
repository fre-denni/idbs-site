<script>
	let { lists = [], biblio } = $props();
</script>

<ul class="list">
	{#each lists as list (list.id)}
		<li class="item" class:biblio>
			{#if list.links === true || list.links === 'True'}
				&rarr;
				<a href={list.href} rel="external" target="_blank">
					{list.content}
				</a>
			{:else}
				{list.content}
			{/if}
		</li>
	{/each}
</ul>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs-3xs);
		padding: 0;
		height: 100%;
		align-items: flex-start;
		justify-content: space-between;
		align-self: stretch;
	}

	.biblio {
		margin-bottom: var(--space-xs-s);
	}
</style>
