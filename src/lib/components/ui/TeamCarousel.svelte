<script>
	import TeamSlot from '../atoms/TeamSlot.svelte';

	let { title = 'The team', professors, tas, variant = 'desktop' } = $props();
</script>

<div
	class="carousel-root"
	class:desktop={variant === 'desktop'}
	class:mobile={variant === 'mobile'}
>
	<div class="header">
		<p class="text-subtitles-semibold">{title}</p>
	</div>

	<div class="team">
		<TeamSlot title="Professors" members={professors} scrollable={variant === 'mobile'} />
		<TeamSlot title="Teaching Assistants" members={tas} scrollable={variant === 'mobile'} />
	</div>
</div>

<style>
	.carousel-root {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s-m);
		padding: 0;
		position: relative;
		width: 100%;
		height: max-content;
	}

	.carousel-root.mobile {
		padding-left: var(--space-xs-s);
		padding-right: var(--space-xs-s);
	}

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		text-transform: uppercase;
		line-height: 0;
		position: relative;
		flex-shrink: 0;
	}

	.carousel-root.desktop .header {
		width: 100%;
	}

	.carousel-root.mobile .header {
		width: 100%;
	}

	.header p {
		margin: 0;
	}

	.team {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-m-l);
		width: 100%;
		position: relative;
	}
</style>
