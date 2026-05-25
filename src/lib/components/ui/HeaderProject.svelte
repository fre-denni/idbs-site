<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	function goBack() {
		goto(resolve('/'));
	}
</script>

<header>
	<button type="button" class="back" onclick={goBack}>
		<p>&larr; Back</p>
	</button>
	<div class="title text-titles-semibold">
		<p>Interaction Design Course</p>
	</div>
</header>

<style>
	header {
		word-break: break-word;
		background: var(--black);
		color: var(--bg);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
		justify-content: flex-start;
		gap: var(--space-xs-s);
		padding: var(--space-xs-s) 0 0;
		text-align: center;
		line-height: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.back {
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		padding: 0;
		font: inherit;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-shrink: 0;
		white-space: nowrap;
		font-family: var(--mono);
		font-size: var(--font-size-titles);
		text-transform: uppercase;
	}

	.back p {
		margin: 0;
		line-height: var(--space-s-m);
	}

	.back p:hover {
		text-decoration: underline;
		text-decoration: underline;
		text-decoration-line: underline;
		text-decoration-style: solid;
		text-decoration-skip-ink: auto;
		text-decoration-thickness: auto;
		text-underline-offset: auto;
		text-underline-position: from-font;
	}

	.title {
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
		color: var(--bg);
	}

	.title p {
		margin: 0;
		line-height: normal;
		white-space: pre-wrap;
	}

	/* Mobile */
	@media (max-width: 768px) {
		header {
			padding: var(--space-2xs-xs) 0 0;
			white-space: nowrap;
		}
		.title {
			flex: 0 0 auto;
		}
		.title p {
			white-space: pre;
		}
	}
</style>
