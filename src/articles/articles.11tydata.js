module.exports = {
	eleventyComputed: {
		permalink: (data) =>
			`dicas/${data.slug ? data.slug : "{{page.fileSlug}}"}.html`,
	},
	layout: "page.njk",
	bannerUrl: "standard-banner.jpg",
};
