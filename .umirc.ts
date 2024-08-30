import { defineConfig } from "umi";
import pxtorem from "postcss-pxtorem";

export default defineConfig({
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 16,
      propList: ["*"],
      selectorBlackList: ["html"],
    }),
  ],
  routes: [
    { path: "/", component: "root" },
    { path: "/dynamic-share", component: "dynamic-share" },
    { path: "/*", component: "404" },
  ],
  alias: {
    "@": "/src",
  },
  base: "/h5",
});
