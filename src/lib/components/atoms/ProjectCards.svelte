<script>
	import Image from './Image.svelte';
	import { resolve } from '$app/paths';
	import TextSlot from './TextSlot.svelte';

	let { project } = $props();

	// let preview = $derived(
	// 	project?.description?.length > 50
	// 		? project.description.slice(0, 50) + '...'
	// 		: project?.description || ''
	// );
</script>

<article class="card">
	<div class="hero">
		<Image src={project.image} alt="heroshot of project {project.name}" />
	</div>
	<TextSlot title={project.name}>
		<p class="text-body-regular line-clamp">{project?.description || ''}</p>
		<a href={resolve(`/projects/${project.slug}`)}>Read more</a>
	</TextSlot>
	<div class="hr"><div class="line"></div></div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-s-m);
		width: 100%;
		overflow: hidden;
	}

	.line-clamp {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; /* For older/current browsers */
		line-clamp: 2; /* The new standard property */
		overflow: hidden;
		overflow-wrap: break-word;
	}

	.hero {
		width: 100%;
		height: auto;
		overflow: hidden;
		border-radius: var(--space-3xs-2xs);
		box-shadow: inset 0 0 0 1px var(--img-border);
	}

	.hero :global(img) {
		width: 100%;
		height: 100%;
		display: block;
		pointer-events: none;
		object-fit: cover;
		aspect-ratio: 52/35;
		border-radius: var(--space-3xs-2xs);
	}

	.hr {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-bottom: var(--space-l-xl);
	}
	.line {
		width: 100%;
		height: 1.5px;
		background: var(--black, #000);
	}
</style>
