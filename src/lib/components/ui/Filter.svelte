<script>
	import Dropdown from '../atoms/Dropdown.svelte';
</script>

<header class="header">
	<div class="filter-label text-subtitles-semibold">filter</div>
	<div class="filter-by">
		<div class="filter-by-label text-body-regular">Filter by year</div>
		<Dropdown label="2025-2026" />
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		background: var(--bg);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: var(--space-m-l);
		width: 100%;
		z-index: 10;
	}
	.filter-label {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		text-transform: uppercase;
	}
	.filter-by {
		display: flex;
		width: 100%;
		align-items: center;
		white-space: nowrap;
	}
	.filter-by-label {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
	}
</style>
