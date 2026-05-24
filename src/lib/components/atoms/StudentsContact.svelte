<script>
	import List from './List.svelte';
	let { students } = $props();
</script>

<div class="grid">
	<div class="names">
		<p class="text-body-regular label">Made by</p>
		<List lists={students.names} />
	</div>
	<div class="contacts">
		<p class="text-body-regular label">You can reach them at</p>
		<List lists={students.mails} />
	</div>
</div>

<style>
	/* MOBILE */
	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2xs-xs);
		padding-top: var(--space-3xs-2xs);
		border-top: 1px solid var(--bg, #fff);
		color: var(--bg);
	}

	.names,
	.contacts {
		padding-top: var(--space-3xs-2xs);
		align-self: start;
	}

	.label {
		margin: 0 0 var(--space-3xs-2xs) 0;
		font-weight: 600;
	}

	/* DESKTOP */
	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		.names {
			grid-column: 1;
		}

		.contacts {
			grid-column: 3;
		}
	}
</style>
