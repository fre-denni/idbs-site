<script>
	let { vimeo = false, youtube = false, pdf = false } = $props();
</script>

<div class="container">
	{#if vimeo}
		<iframe src="" frameborder="0"></iframe>
	{:else if youtube}
		<iframe src="" frameborder="0"></iframe>
	{:else if pdf}
		<iframe src="" frameborder="0"></iframe>
	{/if}
</div>

<style></style>
