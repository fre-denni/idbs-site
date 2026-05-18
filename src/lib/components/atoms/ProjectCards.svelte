<script>
	let { project } = $props();
</script>

<article class="card">
	<div class="hero">
		<img src={project.image} alt="" />
	</div>
	<div class="content">
		<h2 class="title">{project.name}</h2>
		<p class="desc">{project.description}</p>
		<a class="more" href="/" rel="external">Read more</a>
	</div>
	<div class="hr"><div class="line"></div></div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 18px;
		width: 100%;
		overflow: hidden;
	}
	.hero {
		width: 100%;
		height: 350px;
		border-radius: 8px;
		overflow: hidden;
	}
	.hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		color: #000;
		overflow: hidden;
		word-break: break-word;
	}
	.title {
		margin: 0;
		height: 45px;
		display: flex;
		align-items: center;
		font-family: 'Instrument Sans', sans-serif;
		font-weight: 600;
		font-size: 24px;
		line-height: 74.44px;
		text-transform: uppercase;
		font-variation-settings: 'wdth' 100;
	}
	.desc {
		margin: 0;
		font-family: 'Instrument Sans', sans-serif;
		font-weight: 400;
		font-size: 18px;
		line-height: normal;
		font-variation-settings: 'wdth' 100;
	}
	.more {
		height: 45px;
		display: flex;
		align-items: center;
		font-family: 'Instrument Sans', sans-serif;
		font-weight: 500;
		font-size: 24px;
		line-height: 74.44px;
		color: #000;
		text-decoration: underline;
		text-decoration-thickness: 10%;
		text-underline-position: from-font;
		font-variation-settings: 'wdth' 100;
	}
	.hr {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-bottom: 32px;
	}
	.line {
		width: 520px;
		max-width: 100%;
		height: 1px;
		background: #969696;
	}
</style>
