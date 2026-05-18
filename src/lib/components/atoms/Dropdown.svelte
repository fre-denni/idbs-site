<script>
	let { label } = $props();
</script>

<button class="dd">
	<span class="label">{label}</span>
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
		gap: 5px;
		height: 44px;
		padding: 0 8px;
		border: 0;
		background: transparent;
		border-radius: 100px;
		cursor: pointer;
		font-family: 'Instrument Sans', sans-serif;
		font-weight: 500;
		font-size: 18px;
		line-height: 14px;
		color: #000;
		font-variation-settings: 'wdth' 100;
	}
	.chev {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}
</style>
