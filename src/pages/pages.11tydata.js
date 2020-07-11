module.exports = {
	eleventyComputed: {
		permalink: (data) =>
			`idiomas/${data.slug ? data.slug : "{{page.fileSlug}}"}.html`,
	},
	layout: "page.njk",
	tags: "languages",
	bannerUrl: "standard-banner.jpg",
};
