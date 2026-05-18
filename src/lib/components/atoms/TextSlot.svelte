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
		padding: 1rem 0 1.25rem 0;
		width: 100%;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(0.8rem, 1rem, 1.5rem);
		align-self: stretch;
		box-sizing: border-box;
	}
</style>
