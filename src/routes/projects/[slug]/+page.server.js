import { getTableData } from '$lib/server/airtable';
import { error } from '@sveltejs/kit';

export async function load({ setHeaders, params }) {
	// params.slug contiene il valore dell'URL. Es: se l'URL è /progetti/3, params.slug sarà "3"
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=3600'
	});
	// Facciamo una query ad Airtable chiedendo SOLO il record che corrisponde allo slug
	const records = await getTableData('tblPewVLUao5KUvAm', {
		// Se usi il numero del gruppo come URL, usa questa riga:
		filterByFormula: `{Group} = ${params.slug}`,

		// ATTENZIONE: Se hai aggiunto un campo di testo chiamato "Slug" su Airtable,
		// commenta la riga sopra e decommenta questa sotto:
		// filterByFormula: `{Slug} = '${params.slug}'`,

		maxRecords: 1 // Vogliamo solo un risultato
	});

	// Se l'array è vuoto, significa che il progetto non esiste.
	// Lanciamo un errore 404 nativo di SvelteKit che mostrerà la pagina di errore di default
	if (!records || records.length === 0) {
		error(404, {
			message: 'Progetto non trovato'
		});
	}

	// Estraiamo il primo (e unico) record trovato
	const rawProject = records[0];

	// Formattiamo i dati in un oggetto pulito e facile da usare nel frontend,
	// gestendo con cura eventuali campi vuoti o allegati mancanti
	const project = {
		group: rawProject.Group,
		title: `Group ${rawProject.Group}`,
		studentsName: rawProject['Student Name'] || 'Nomi non disponibili',
		studentsEmail: rawProject['Student Email'] || '',
		description: rawProject.Description || '',

		// L'immagine principale (Heroshot)
		heroImage: rawProject.Heroshot?.[0]?.url || '',

		// Array di immagini extra della gallery (il campo "Attachments")
		gallery: rawProject.Attachments ? rawProject.Attachments.map((img) => img.url) : [],

		// Link al video
		videoUrl: rawProject['Project video'] || null,

		// Link al PDF caricato (se esiste)
		reportUrl: rawProject.Report?.[0]?.url || null
	};

	return {
		project
	};
}
