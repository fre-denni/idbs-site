<script>
	let { lists = [] } = $props();
</script>

<ul class="list">
	{#each lists as list (list.id)}
		<li class="item">
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
		gap: var(--space-xs-s);
		padding: 0;
		height: 100%;
		align-items: flex-start;
		justify-content: space-between;
		align-self: stretch;
	}
</style>
