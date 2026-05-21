<script>
	let { project } = $props();
</script>

<article class="card">
	<div class="hero">
		<img src={project.image} alt="heroshot of students projects" />
	</div>
	<div class="content">
		<h2 class="text-subtitles-semibold title">{project.name}</h2>
		<p class="text-body-regular">{project.description}</p>
		<a href="/" rel="external">Read more</a>
	</div>
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

	.hero {
		width: 100%;
		height: auto;
		overflow: hidden;
		border-radius: var(--space-3xs-2xs);
		box-shadow: inset 0 0 0 1px var(--img-border);
	}

	.hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
		object-fit: cover;
		aspect-ratio: 52/35;
		border-radius: var(--space-3xs-2xs);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs-s);
		padding: 0 0 var(--space-xs-s);
		width: 100%;
		color: var(--black, #000);
		overflow: hidden;
		word-break: break-word;
	}

	.title {
		margin: 0;
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
