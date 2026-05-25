<script>
	import List from '../atoms/List.svelte'; // Assicurati che il path sia corretto

	// Usiamo un fallback vuoto per evitare crash se per qualche motivo
	// il server non passa la prop students
	let { students = { names: [], mails: [] } } = $props();
</script>

<div class="grid">
	<div class="names">
		<p class="text-body-regular label">Made by</p>
		{#if students.names.length > 0}
			<List lists={students.names} />
		{:else}
			<p class="text-body-regular">No names available</p>
		{/if}
	</div>

	<div class="contacts">
		<p class="text-body-regular label">Reach them at</p>
		{#if students.mails.length > 0}
			<List lists={students.mails} />
		{:else}
			<p class="text-body-regular">No contacts available</p>
		{/if}
	</div>
</div>

<style>
	/* Il tuo CSS originale qui (va benissimo) */
	.grid {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2xs-xs);
		padding-top: var(--space-3xs-2xs);
		padding-bottom: var(--space-m-l);
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
