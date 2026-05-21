<script>
	let { children, title = null } = $props();
</script>

<div class="content">
	{#if title}
		<h2 class="text-subtitles-semibold">{title}</h2>
	{/if}
	{@render children()}
</div>

<style>
	.content {
		display: flex;
		padding: 0;
		margin-bottom: var(--space-s-m);
		width: 100%;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s-m);
		align-self: stretch;
		box-sizing: border-box;
	}
	.content h2 {
		margin: 0;
	}
</style>
