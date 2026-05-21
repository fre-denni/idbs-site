<script>
	let { image, name, linkedin, mail } = $props();
</script>

<div class="card">
	<div class="card-inner">
		<div class="photo">
			<img alt={name} src={image} />
		</div>
		<p class="name text-body-regular">{name}</p>
		<div class="links">
			{#if linkedin}
				<a class="link linkedin" href={linkedin} rel="external">Linkedin</a>
			{/if}
			{#if mail}
				<a class="link mail" href={`mailto:${mail}`}>Mail</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.card {
		grid-column: auto;
		grid-row: 1;
		justify-self: start;
		align-self: start;
		width: 100%;
		position: relative;
	}

	.card-inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-3xs-2xs);
		width: 100%;
		height: 100%;
		position: relative;
		background-clip: padding-box;
	}

	.photo {
		width: var(--profile-height);
		height: var(--profile-height);
		aspect-ratio: 0.8 / 1;
		overflow: hidden;
		flex-shrink: 0;
		border-radius: var(--space-3xs-2xs);
		border: 1px solid var(--img-border);
	}

	.photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
		filter: saturate(0%);
	}

	.name {
		min-width: 100%;
		width: min-content;
		margin: 0;
		position: relative;
		flex-shrink: 0;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-3xs-2xs);
		position: relative;
		flex-shrink: 0;
	}

	.link {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		position: relative;
	}

	.link.linkedin {
		white-space: nowrap;
	}

	.link.mail {
		width: fit-content;
		flex-direction: column;
		align-items: flex-start;
	}
</style>
