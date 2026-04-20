/** @type {import('vite').UserConfig} */

const config = {
	base: "/innowise-test-assignment/",

	build: {
		rolldownOptions: {
			output: {
				assetFileNames: "assets/[name][extname]",
			},
		},
	},
};

export default config;
