<script>
	let { image, name, linkedin, mail } = $props();
</script>

<div class="card">
	<div class="card-inner">
		<div class="photo">
			<img alt={name} src={image} />
		</div>
		<p class="name">{name}</p>
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
		flex-shrink: 0;
		position: relative;
	}

	.card-inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6.623px;
		width: 100%;
		height: 100%;
		position: relative;
		background-clip: padding-box;
		border: 0 solid transparent;
	}

	.photo {
		position: relative;
		width: 136.325px;
		height: 138.533px;
		border-radius: 4.415px;
		overflow: hidden;
		flex-shrink: 0;
	}

	.photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 4.415px;
		pointer-events: none;
		max-width: none;
	}

	.name {
		font-family: 'Instrument Sans', sans-serif;
		font-weight: 500;
		font-size: 12px;
		color: #000;
		line-height: normal;
		height: 15.454px;
		min-width: 100%;
		width: min-content;
		font-variation-settings: 'wdth' 100;
		margin: 0;
		position: relative;
		flex-shrink: 0;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		position: relative;
		flex-shrink: 0;
	}

	.link {
		font-family: 'Instrument Sans', sans-serif;
		font-weight: 400;
		font-size: 12px;
		color: #000;
		line-height: 10.404px;
		text-decoration: none;
		padding-bottom: 0.464px;
		font-variation-settings: 'wdth' 100;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		position: relative;
	}

	.link.linkedin {
		white-space: nowrap;
	}

	.link.mail {
		width: 24px;
		flex-direction: column;
		align-items: flex-start;
	}
</style>
