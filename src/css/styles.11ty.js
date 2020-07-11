const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

const fileName = "styles.css";

const purgecss = require("@fullhuman/postcss-purgecss")({
	content: ["./src/**/*.njk", "./src/**/*.html"],
	defaultExtractor: (content) => {
		return content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
	},
});

module.exports = class {
	async data() {
		const rawFilepath = path.join(__dirname, fileName);
		return {
			permalink: `css/${fileName}`,
			rawFilepath,
			rawCss: await fs.readFileSync(rawFilepath),
			eleventyExcludeFromCollections: true,
		};
	}

	async render({ rawCss, rawFilepath }) {
		return await postcss([
			require("postcss-import")({
				addModulesDirectories: [
					path.resolve(path.join(__dirname, "node_modules")),
				],
			}),
			require("tailwindcss")("./tailwind.config.js"),
			// require('postcss-nested'),
			require("autoprefixer"),
			...(process.env.ELEVENTY_ENV === "production"
				? [purgecss, require("cssnano")]
				: []),
		])
			.process(rawCss, { from: rawFilepath })
			.then((result) => result.css);
	}
};
