<script>
	import Image from '../atoms/Image.svelte';
	import StudentsContact from '../atoms/StudentsContact.svelte';
	import TextSlot from '../atoms/TextSlot.svelte';

	let { project } = $props();
</script>

<div class="heroshot">
	<div class="image">
		<Image src={project.heroshot} alt="heroshot of project {project.title}" />
	</div>
	<StudentsContact students={project.students} />
	<TextSlot title={project.title}>
		<p class="text-body-regular">{project.description}</p>
	</TextSlot>
</div>

<style>
	.heroshot {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s-m);
		width: 100%;
		position: relative;
		color: var(--bg, #fff);
		word-break: break-word;
	}

	.image {
		position: relative;
		width: 100%;
		aspect-ratio: 648 / 420;
		border-radius: var(--space-3xs-2xs);
		overflow: hidden;
		flex-shrink: 0;
		border-radius: var(--space-3xs-2xs);
		border: 1px solid var(--img-border-dark);
	}

	.image :global(img) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--space-3xs-2xs);
		pointer-events: none;
	}
</style>
