const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
	eleventyConfig.addPassthroughCopy({ "src/img": "img" });
	eleventyConfig.addWatchTarget("./src/css");
	eleventyConfig.addWatchTarget("./tailwind.config.js");

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addFilter("formatDate", function (dateObj, fmt = "DD") {
		return DateTime.fromJSDate(dateObj).toFormat(fmt);
	});

	eleventyConfig.addShortcode("version", function () {
		return String(Date.now());
	});

	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		if (process.env.ELEVENTY_ENV === "production") {
			if (outputPath.endsWith(".html")) {
				let minified = htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
				});
				return minified;
			}
			return content;
		}
		return content;
	});

	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			layouts: "_layouts",
		},
	};
};
