<script>
	import { onMount } from 'svelte';
	let { title, open = $bindable(false), children } = $props();

	let isDesktop = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(min-width: 768px)');
		const update = () => (isDesktop = mq.matches);

		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	});

	let expanded = $derived(isDesktop || open);
	function toggle() {
		if (!isDesktop) open = !open;
	}
</script>

<div class="content">
	<button
		class="header"
		type="button"
		onclick={toggle}
		aria-expanded={expanded}
		disabled={isDesktop}
		style="cursor: default;"
	>
		<h1 class="text-titles-semibold">
			{title}
		</h1>
		{#if !isDesktop}
			<span class="chevron" class:open={expanded} aria-hidden="true">
				<svg viewBox="0 0 17.6 9.6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0.8 0.8L8.8 8.8L16.8 0.8"
						stroke="#969696"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		{/if}
	</button>

	{#if expanded}
		<div class="body">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.content {
		display: flex;
		padding: 1rem 1rem 1.25rem 1rem;
		width: 100%;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(0.8rem, 1rem, 1.5rem);
		align-self: stretch;
		box-sizing: border-box;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		text-align: left;
		color: inherit;
		font: inherit;
	}

	h1 {
		margin: 0;
		flex: 1;
	}

	.chevron {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
		transition: transform 0.25s ease;
		cursor: pointer;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.chevron svg {
		width: 1.1rem;
		height: auto;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: clamp(0.8rem, 1rem, 1.5rem);

		align-self: stretch;
	}

	@media (min-width: 768px) {
		.content {
			width: 100%;
			padding: 1.25rem 2.5rem 2.8125rem 2.5rem;
			gap: 1.5rem;
			box-sizing: border-box;
		}

		h1 {
			display: flex;
			height: 2.8125rem;
			flex-direction: column;
			justify-content: center;
			align-self: stretch;
		}

		.body :global(p) {
			width: 100%;
			text-wrap: balance;
		}
	}
</style>
