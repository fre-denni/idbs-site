import { getTableData } from '$lib/server/airtable';
import { error } from '@sveltejs/kit';

// @ts-ignore
function toTitleCase(str) {
	if (!str) return '';
	return (
		str
			.toLowerCase()
			.split(' ')
			// @ts-ignore
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	);
}

// @ts-ignore
function extractString(field) {
	if (!field) return '';
	if (Array.isArray(field)) return field[0] || ''; // Se è un array [ "testo" ], prende "testo"
	return String(field); // Se è già testo, va bene così
}

// @ts-ignore
export async function load({ setHeaders, params }) {
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=3600'
	});

	const groupIdString = params.slug.split('-')[0];
	const groupId = parseInt(groupIdString, 10);

	if (isNaN(groupId)) {
		error(404, { message: 'URL del progetto non valido' });
	}

	// 1. Facciamo DUE query in parallelo: il progetto specifico e TUTTI gli studenti
	// Metti l'ID reale della tua nuova tabella Students al posto di 'tblStudents123'
	const [projectRecords, allStudentsRaw] = await Promise.all([
		getTableData('tblPewVLUao5KUvAm', {
			filterByFormula: `{Group} = ${groupId}`,
			maxRecords: 1
		}),
		getTableData('tblQo6f5Gis7yYhVM') // La tua nuova tabella "Students"
	]);

	if (!projectRecords || projectRecords.length === 0) {
		error(404, { message: 'Progetto non trovato' });
	}

	const rawProject = projectRecords[0];

	// 2. LOGICA DI MERGE (Unire i record)
	// Controlliamo l'array di ID che Airtable ci passa nel campo "Students"
	// @ts-ignore
	const studentIdsInProject = rawProject.Students || [];

	// Creiamo due array vuoti per i nomi e le mail, usando lo stesso formato
	// richiesto dal tuo componente <List />
	// @ts-ignore
	const projectNamesList = [];
	// @ts-ignore
	const projectMailsList = [];

	// Per ogni ID studente collegato a questo progetto...
	// @ts-ignore
	studentIdsInProject.forEach((id) => {
		// Cerchiamo l'oggetto studente intero nell'elenco di tutti gli studenti
		const matchedStudent = allStudentsRaw.find((s) => s.id === id);

		if (matchedStudent) {
			// Aggiungiamo il nome (se esiste) formattato per il componente List
			// @ts-ignore
			if (matchedStudent.Name) {
				projectNamesList.push({
					id: `name-${id}`,
					// @ts-ignore
					content: toTitleCase(matchedStudent.Name),
					links: false // È solo testo
				});
			}

			// Aggiungiamo la mail (se esiste) come link "mailto:"
			// @ts-ignore
			if (matchedStudent.Mail) {
				projectMailsList.push({
					id: `mail-${id}`,
					// @ts-ignore
					content: 'Student email',
					// @ts-ignore
					href: `mailto:${matchedStudent.Mail}`,
					links: true // È cliccabile
				});
			}
		}
	});

	// 3. Formattiamo l'oggetto da inviare alla pagina
	const project = {
		// @ts-ignore
		group: rawProject.Group,
		// @ts-ignore
		title: extractString(rawProject.Title),
		// @ts-ignore
		description: extractString(rawProject.Description),
		// @ts-ignore
		heroImage: rawProject.Heroshot?.[0]?.url || '',
		// @ts-ignore
		gallery: rawProject.Attachments ? rawProject.Attachments.map((img) => img.url) : [],

		// ECCO IL FIX DEL VIDEO CHE CAUSAVA IL CRASH
		// @ts-ignore
		videoUrl: extractString(rawProject['Project Videos']) || null,

		// @ts-ignore
		reportUrl: rawProject.Report?.[0]?.url || null,

		// Passiamo gli array già formattati per i contatti
		studentsInfo: {
			// @ts-ignore
			names: projectNamesList,
			// @ts-ignore
			mails: projectMailsList
		}
	};

	return {
		project
	};
}
