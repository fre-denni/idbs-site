// // add server collection and caching
// // testo + images + iframe + pdf
// import { getTableData } from '$lib/server/airtable';
// export async function load() {
// 	const [projects] = await Promise.all([
// 		getTableData('student-content', {
// 			//filter and then get the content
// 			filterByFormula: `{Slug} = '${params.slug}'`,
// 			maxRecords: 1
// 		})
// 	]);

// 	return { projects };
// }
