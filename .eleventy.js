const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ "src/img": "img" });
	eleventyConfig.addWatchTarget("./src/css");
	eleventyConfig.addWatchTarget("./tailwind.config.js");

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addFilter("formatDate", function (dateObj, fmt = "DD") {
		return DateTime.fromJSDate(dateObj).toFormat(fmt);
	});

	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			layouts: "_layouts",
		},
	};
};
