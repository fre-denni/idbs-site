import { getTableData } from '$lib/server/airtable';
import { error } from '@sveltejs/kit';

export async function load({ setHeaders, params }) {
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=3600'
	});

	// 1. Estraiamo il numero del gruppo dallo slug
	// Se l'URL è /project/3-titolo-progetto, splittando per "-" il primo elemento [0] è "3"
	const groupIdString = params.slug.split('-')[0];
	const groupId = parseInt(groupIdString, 10);

	// Se l'utente scrive manualmente un URL senza numero iniziale (es. /project/ciao),
	// groupId sarà NaN. In quel caso blocchiamo subito tutto e diamo 404.
	if (isNaN(groupId)) {
		error(404, { message: 'Project URL not valid' });
	}

	// 2. Facciamo la query ad Airtable usando il numero estratto
	const records = await getTableData('tblPewVLUao5KUvAm', {
		// Ora cerchiamo specificamente il numero, non l'intera stringa dell'URL
		filterByFormula: `{Group} = ${groupId}`,
		maxRecords: 1
	});

	if (!records || records.length === 0) {
		error(404, {
			message: 'Project not founded'
		});
	}

	const rawProject = records[0];

	// 3. Formattiamo i dati
	const project = {
		// @ts-ignore
		group: rawProject.Group,
		// @ts-ignore
		title: `Group N° ${rawProject.Group || '0'} - ${rawProject.Title || ''}`,
		// @ts-ignore
		studentsName: rawProject['Student Name'] || 'Names not available',
		// @ts-ignore
		studentsEmail: rawProject['Student Email'] || '',
		// @ts-ignore
		description: rawProject.Description || '',

		// Immagine principale
		// @ts-ignore
		heroshot: rawProject.Heroshot?.[0]?.url || '',

		// Gallery immagini
		// @ts-ignore
		gallery: rawProject.Attachments ? rawProject.Attachments.map((img) => img.url) : [],

		// Link video
		// @ts-ignore
		videoUrl: rawProject['Project video'] || null,

		// Link PDF
		// @ts-ignore
		reportUrl: rawProject.Report?.[0]?.url || null
	};

	return {
		project
	};
}
