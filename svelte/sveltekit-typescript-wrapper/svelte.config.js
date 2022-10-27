import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({ typescript: true }),

	kit: {
		adapter: adapter({ pages: "./public" }),
    browser: {
      hydrate: true,
		  router: true
    },
    trailingSlash: "always",
    prerender: {
      default: false
    }
	}
};

export default config;
