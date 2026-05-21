import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			images: {
				sizes: [320, 640, 828, 1200, 1920], // Ho aggiunto 320 per le card su mobile
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 3600, // 1 ora di cache per le immagini
				domains: ['v5.airtableusercontent.com', 'dl.airtable.com'] // DOMINI AIRTABLE AUTORIZZATI
			}
		})
	}
};

export default config;
