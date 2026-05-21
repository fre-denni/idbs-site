<script>
	let { label } = $props();
</script>

<button class="dd">
	<span class="label text-body-regular">{label}</span>
	<svg class="chev" viewBox="0 0 9.6 5.6" fill="none" aria-hidden="true">
		<path
			d="M0.8 0.8L4.8 4.8L8.8 0.8"
			stroke="#969696"
			stroke-width="1.6"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>

<style>
	.dd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-4xs-3xs);
		height: 100%;
		padding: 0 var(--space-2xs-xs);
		border: 0;
		background: transparent;
		cursor: pointer;
		font-size: var(--font-size-titles);
		color: var(--black, #000);
	}
	.chev {
		width: var(--space-2xs-xs);
		height: auto;
		flex-shrink: 0;
	}
	.label {
		width: 100%;
		white-space: nowrap;
	}
</style>
