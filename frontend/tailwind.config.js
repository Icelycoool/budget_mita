/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", "sans-serif"],
			},
		},

		colors: {
			primary: "#19375A",
			secondary: "#EC7630",
			secondaryHover: "#CC632F",
			accent: "#808080",
			accentHover: "#5a5a5a",
			white: "#F4F4F4",
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".mix-blend-multiply": {
					"mix-blend-mode": "multiply",
				},
				".mix-blend-overlay": {
					"mix-blend-mode": "overlay",
				},
				".mix-blend-screen": {
					"mix-blend-mode": "screen",
				},
			})
		},
	],
}
