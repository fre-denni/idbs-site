<script>
	import Filter from '../ui/Filter.svelte';
	import ProjectCard from '../atoms/ProjectCards.svelte';
	import projects from '$lib/assets/project.json';
</script>

<div class="feed">
	<Filter />
	<div class="content">
		{#each projects as project (project.id)}
			<ProjectCard {project} />
		{/each}
	</div>
</div>

<style>
	.feed {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: flex-start;
		width: 100%;
		padding: 0;
		box-sizing: border-box;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
</style>
