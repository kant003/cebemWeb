/** @type {import('tailwindcss').Config} */
import animations from 'tailwindcss-animated'
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	"./node_modules/tw-elements/dist/js/**/*.js"
	],
	theme: {
		extend: {},
	},
	plugins: [animations,require("tw-elements/dist/plugin.cjs")
],
}
