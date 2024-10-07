import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import WindiCSS from "vite-plugin-windicss";
import eslint from "vite-plugin-eslint";
import legacy from "vite-plugin-legacy-swc";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@@": path.resolve(__dirname),
      },
    },
    css: {
      preprocessorOptions: {
        less: {},
        scss: {
          additionalData: "",
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        eslintrc: {
          enabled: true,
          filepath: "./eslintrc-auto-import.json",
        },
        resolvers: [],
      }),
      Components({
        resolvers: [
          IconsResolver({
            prefix: false,
            enabledCollections: ["mingcute"],
            alias: { mc: "mingcute" },
          }),
        ],
      }),
      Icons({ autoInstall: true }),
      svgLoader(),
      WindiCSS(),
      eslint(),
      legacy(),
      createHtmlPlugin({
        inject: {
          data: { build_time: new Date().toLocaleString() },
        },
      }),
      visualizer({ open: false, filename: "dist/stats.html" }),
    ],
    server: {
      host: true,
      port: 5173,
      proxy: {
        "/": env.VITE_API_BASE_URL,
      },
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      commonjsOptions: { transformMixedEsModules: true },
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          // manualChunks: {
          //   vue: ["vue"],
          // },
          // manualChunks(id) {
          //   if (id.includes("node_modules")) {
          //     console.log(id);
          //     return id.toString().split("node_modules/")[1].split("/")[0].toString();
          //   }
          // },
        },
      },
    },
    reportCompressedSize: false, // gzip 压缩大小报告
  };
});
