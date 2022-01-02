/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';
const dev = process.env.NODE_ENV === 'development';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		vite: {
			optimizeDeps: {
				exclude: ['@urql/svelte'],
			}
		},
		paths: {
			base: dev ? '' : '/iinsight',
		},
	},
};

export default config;
