// @ts-nocheck
// add airtable connection
import Airtable from 'airtable';
import { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } from '$env/static/private';

const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

export async function getTableData(tableName, options = {}) {
	try {
		const records = await base(tableName).select(options).all();
		return records.map((record) => ({
			id: record.id,
			...record.fields
		}));
	} catch (error) {
		console.error(`Error fetching ${tableName}:`, error);
		return [];
	}
}
