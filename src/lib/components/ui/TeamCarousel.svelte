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
		<TeamSlot title="Teaching Assistant" members={tas} scrollable={variant === 'mobile'} />
	</div>
</div>

<style>
	.carousel-root {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
		padding: 20px 0 30px 0;
		position: relative;
		width: 100%;
		/* IMPORTANT: Keep this as max-content so your UI doesn't collapse to 0px */
		height: max-content;
	}

	.carousel-root.mobile {
		padding-left: 16px;
		padding-right: 16px;
	}

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 45px;
		color: #000;
		text-transform: uppercase;
		font-variation-settings: 'wdth' 100;
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
		line-height: 74.44px;
	}

	.team {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 32px;
		width: 100%;
		position: relative;
	}
</style>
