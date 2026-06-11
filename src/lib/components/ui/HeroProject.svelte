<script>
	import Image from '../atoms/Image.svelte';
	import StudentsContact from '../atoms/StudentsContact.svelte';
	import TextSlot from '../atoms/TextSlot.svelte';

	let { project } = $props();
</script>

<div class="heroshot">
	<p class="text-titles-semibold">Group N°{project.group}</p>
	<div class="image">
		<Image src={project.heroImage || project.heroshot} alt="Heroshot of project {project.title}" />
	</div>

	{#if project.studentsInfo && (project.studentsInfo.names.length > 0 || project.studentsInfo.mails.length > 0)}
		<StudentsContact students={project.studentsInfo} />
	{/if}

	<TextSlot title={project.title}>
		<p class="text-body-regular preserve-breaks">{project.description}</p>
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
		aspect-ratio: 800 / 420;
		border-radius: var(--space-3xs-2xs);
		overflow: hidden;
		flex-shrink: 0;
		border: 1px solid var(--img-border-dark);
	}

	.image :global(img) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
	}

	.preserve-breaks {
		white-space: pre;
		text-wrap: pretty;
		overflow-wrap: break-word;
		hyphens: manual;
		padding-bottom: var(--space-m-l);
	}
</style>
