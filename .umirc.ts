import { defineConfig } from "umi";
import pxtorem from "postcss-pxtorem";

import routes from "./src/routes";

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
    ...routes,
    { path: "/*", component: "404" },
  ],
  alias: {
    "@": "/src",
  },
  base: "/h5",
  chainWebpack(config, args) {
    config.output.clean(true).chunkFilename("[contenthash].js");
  },
  // proxy: {
  //   "/api": {
  //     //联调地址
  //     target:
  //       "https://springboot-p6qg-111263-4-1325524078.sh.run.tcloudbase.com",
  //     changeOrigin: true,
  //     pathRewrite: {},
  //   },
  // },
});
