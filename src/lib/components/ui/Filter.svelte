<script>
	import Dropdown from '../atoms/Dropdown.svelte';
</script>

<header class="header">
	<div class="filter-label text-subtitles-semibold">filter</div>
	<div class="filter-by">
		<div class="filter-by-label">Filter by year</div>
		<Dropdown label="2025-2026" />
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		background: #fff;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
		z-index: 10;
	}
	.filter-label {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		color: #000;
		font-variation-settings: 'wdth' 100;
	}
	.filter-by {
		display: flex;
		align-items: flex-start;
	}
	.filter-by-label {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		color: #000;
		font-variation-settings: 'wdth' 100;
	}
</style>
