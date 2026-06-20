// @ts-nocheck
import { getTableData } from '$lib/server/airtable';

function getSlugged(text) {
	if (!text) return 'untitled';
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\\-]+/g, '')
		.replace(/\\-\\-+/g, '-');
}

export const config = {
	isr: {
		expiration: 3600 // Congela la pagina sui server Vercel per 1 ora (3600 secondi)
	}
};

export async function load({ params }) {
	const [cmsRaw, teamRaw, linksRaw, studentsRaw] = await Promise.all([
		getTableData('tblaok4J3VPeMtqFC'), // cms-content
		getTableData('tbl60Ns3LfLpX0gMo'), // team-members
		getTableData('tblmJ2kBokK1DmHVs'), // links-library
		getTableData('tblPewVLUao5KUvAm') // student-content
	]);

	// 1. Parse CMS Content come stringhe pure
	const cmsData = cmsRaw[0] || {};
	const cms = {
		// @ts-ignore
		courseDescription: cmsData['Course Description'] || '',
		// @ts-ignore
		themeDescription: cmsData['Theme Description'] || '',
		// @ts-ignore
		toolsDescription: cmsData['Tools Description'] || ''
	};

	// 2. Parse Team Members
	const professors = teamRaw
		// @ts-ignore
		.filter((m) => m.Role === 'Professor')
		.map((m) => ({
			// @ts-ignore
			name: m.Name,
			// @ts-ignore
			linkedin: m.LinkedIn || null,
			// @ts-ignore
			mail: m.Email || null,
			// @ts-ignore
			image: m['Profile Picture']?.[0]?.url || ''
		}));

	const tas = teamRaw
		// @ts-ignore
		.filter((m) => m.Role === 'Assistant')
		.map((m) => ({
			// @ts-ignore
			name: m.Name,
			// @ts-ignore
			linkedin: m.LinkedIn || null,
			// @ts-ignore
			mail: m.Email || null,
			// @ts-ignore
			image: m['Profile Picture']?.[0]?.url || ''
		}));

	// 3. Parse Links and Bibliography
	const links = linksRaw
		// @ts-ignore
		.filter((l) => l['Link Type'] !== 'biblio')
		.map((l) => ({
			id: l.id,
			// @ts-ignore
			content: l.Content,
			// @ts-ignore
			href: l.URL || '',
			// @ts-ignore
			links: l['Is Link'] === true
		}));

	const biblio = linksRaw
		// @ts-ignore
		.filter((l) => l['Link Type'] === 'biblio')
		.map((l) => ({
			id: l.id,
			// @ts-ignore
			content: l.Content,
			links: false
		}));

	// 4. Parse Student Projects
	const projects = studentsRaw
		.map((s) => ({
			id: s.id,
			// Estraiamo il numero reale per poterci fare operazioni matematiche
			// @ts-ignore
			groupNum: parseInt(s.Group, 10) || 0,
			// @ts-ignore
			name: `Group N° ${s.Group || '0'} - ${s.Title}`,
			// @ts-ignore
			slug: `${s.Group}-${getSlugged(s.Title || '')}`,
			// @ts-ignore
			description: s.Description || '',
			// @ts-ignore
			image: s.Heroshot?.[0]?.thumbnails?.large?.url || s.Heroshot?.[0]?.url || ''
		}))
		// Ordiniamo l'array dal gruppo più basso al più alto
		.sort((a, b) => a.groupNum - b.groupNum);

	return {
		cms,
		professors,
		tas,
		links,
		biblio,
		projects
	};
}
