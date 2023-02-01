// vite.config.ts
import path from "path";
import { defineConfig } from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite@4.0.4/node_modules/vite/dist/node/index.js";
import Preview from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-plugin-vue-component-preview@0.3.4_rollup@2.79.1+vite@4.0.4/node_modules/vite-plugin-vue-component-preview/out/index.js";
import Vue from "file:///D:/github/Xanadu-web/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.0.4+vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-plugin-pages@0.28.0_vite@4.0.4/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-ssg-sitemap@0.4.3/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-plugin-vue-layouts@0.7.0_oh6kquo6biweymmreht6aj34oy/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///D:/github/Xanadu-web/node_modules/.pnpm/unplugin-vue-components@0.22.12_rollup@2.79.1+vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///D:/github/Xanadu-web/node_modules/.pnpm/unplugin-auto-import@0.12.1_m7tggu3yw2k74mbcjpdc3sodcu/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-plugin-vue-markdown@0.22.2_rollup@2.79.1+vite@4.0.4/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import { VitePWA } from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-plugin-pwa@0.14.1_fh56thzkyakgjs6jm6gbtbzxsq/node_modules/vite-plugin-pwa/dist/index.mjs";
import VueI18n from "file:///D:/github/Xanadu-web/node_modules/.pnpm/@intlify+vite-plugin-vue-i18n@6.0.3_vite@4.0.4+vue-i18n@9.2.2/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import Inspect from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-plugin-inspect@0.7.14_rollup@2.79.1+vite@4.0.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import Inspector from "file:///D:/github/Xanadu-web/node_modules/.pnpm/vite-plugin-vue-inspector@2.0.4_vite@4.0.4/node_modules/vite-plugin-vue-inspector/dist/index.mjs";
import LinkAttributes from "file:///D:/github/Xanadu-web/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import Unocss from "file:///D:/github/Xanadu-web/node_modules/.pnpm/unocss@0.48.4_rollup@2.79.1+vite@4.0.4/node_modules/unocss/dist/vite.mjs";
import Shiki from "file:///D:/github/Xanadu-web/node_modules/.pnpm/markdown-it-shiki@0.7.2/node_modules/markdown-it-shiki/dist/index.mjs";
import VueMacros from "file:///D:/github/Xanadu-web/node_modules/.pnpm/unplugin-vue-macros@1.4.1_bvw6kv7lvwggnzxjroyrafsjjq/node_modules/unplugin-vue-macros/dist/vite.mjs";
import { ArcoResolver } from "file:///D:/github/Xanadu-web/node_modules/.pnpm/unplugin-vue-components@0.22.12_rollup@2.79.1+vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "D:\\github\\Xanadu-web";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  server: {
    host: "0.0.0.0",
    cors: true,
    proxy: {
      "/@api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/@api/, "")
      }
    }
  },
  plugins: [
    Preview(),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true
        })
      }
    }),
    Pages({
      extensions: ["vue", "md"],
      exclude: ["**/pages/path.vue"]
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core"
      ],
      resolvers: [ArcoResolver()],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/store",
        "src/hooks"
      ],
      vueTemplate: true
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts"
    }),
    Unocss(),
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: "vitesse-light",
            dark: "vitesse-dark"
          }
        });
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
      }
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "Xanadu",
        short_name: "Xanadu",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
    }),
    Inspect(),
    Inspector({
      toggleButtonVisibility: "never"
    })
  ],
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi"]
    }
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap();
    }
  },
  ssr: {
    noExternal: ["workbox-window", /vue-i18n/]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcWGFuYWR1LXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXFhhbmFkdS13ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGh1Yi9YYW5hZHUtd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgUHJldmlldyBmcm9tICd2aXRlLXBsdWdpbi12dWUtY29tcG9uZW50LXByZXZpZXcnXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBnZW5lcmF0ZVNpdGVtYXAgZnJvbSAndml0ZS1zc2ctc2l0ZW1hcCdcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duJ1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcbmltcG9ydCBWdWVJMThuIGZyb20gJ0BpbnRsaWZ5L3ZpdGUtcGx1Z2luLXZ1ZS1pMThuJ1xuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcbmltcG9ydCBJbnNwZWN0b3IgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWluc3BlY3RvcidcbmltcG9ydCBMaW5rQXR0cmlidXRlcyBmcm9tICdtYXJrZG93bi1pdC1saW5rLWF0dHJpYnV0ZXMnXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IFNoaWtpIGZyb20gJ21hcmtkb3duLWl0LXNoaWtpJ1xuaW1wb3J0IFZ1ZU1hY3JvcyBmcm9tICd1bnBsdWdpbi12dWUtbWFjcm9zL3ZpdGUnXG5pbXBvcnQgeyBBcmNvUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gLFxuICAgIH0sXG4gIH0sXG5cbiAgc2VydmVyOiB7XG4gICAgLy8gXHU2NzBEXHU1MkExXHU1NjY4XHU0RTNCXHU2NzNBXHU1NDBEXHVGRjBDXHU1OTgyXHU2NzlDXHU1MTQxXHU4QkI4XHU1OTE2XHU5MEU4XHU4QkJGXHU5NUVFXHVGRjBDXHU1M0VGXHU4QkJFXHU3RjZFXHU0RTNBICcwLjAuMC4wJ1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBjb3JzOiB0cnVlLFxuICAgIC8vIFx1NEVFM1x1NzQwNlx1OERFOFx1NTdERlxuICAgIHByb3h5OiB7XG4gICAgICAnL0BhcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9AYXBpLywgJycpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICBQcmV2aWV3KCksXG5cbiAgICBWdWVNYWNyb3Moe1xuICAgICAgcGx1Z2luczoge1xuICAgICAgICB2dWU6IFZ1ZSh7XG4gICAgICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgICAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5ub2VydS92aXRlLXBsdWdpbi1wYWdlc1xuICAgIFBhZ2VzKHtcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICBleGNsdWRlOiBbJyoqL3BhZ2VzL3BhdGgudnVlJ10sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSm9obkNhbXBpb25Kci92aXRlLXBsdWdpbi12dWUtbGF5b3V0c1xuICAgIExheW91dHMoKSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1hdXRvLWltcG9ydFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAndnVlLWkxOG4nLFxuICAgICAgICAndnVlL21hY3JvcycsXG4gICAgICAgICdAdnVldXNlL2hlYWQnLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgIF0sXG4gICAgICByZXNvbHZlcnM6IFtBcmNvUmVzb2x2ZXIoKV0sXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgZGlyczogW1xuICAgICAgICAnc3JjL2NvbXBvc2FibGVzJyxcbiAgICAgICAgJ3NyYy9zdG9yZScsXG4gICAgICAgICdzcmMvaG9va3MnLFxuICAgICAgXSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgQXJjb1Jlc29sdmVyKHtcbiAgICAgICAgICBzaWRlRWZmZWN0OiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICAvLyBhbGxvdyBhdXRvIGxvYWQgbWFya2Rvd24gY29tcG9uZW50cyB1bmRlciBgLi9zcmMvY29tcG9uZW50cy9gXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgLy8gYWxsb3cgYXV0byBpbXBvcnQgYW5kIHJlZ2lzdGVyIGNvbXBvbmVudHMgdXNlZCBpbiBtYXJrZG93blxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3Vub2Nzc1xuICAgIC8vIHNlZSB1bm9jc3MuY29uZmlnLnRzIGZvciBjb25maWdcbiAgICBVbm9jc3MoKSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi12dWUtbWFya2Rvd25cbiAgICAvLyBEb24ndCBuZWVkIHRoaXM/IFRyeSB2aXRlc3NlLWxpdGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlc3NlLWxpdGVcbiAgICBNYXJrZG93bih7XG4gICAgICB3cmFwcGVyQ2xhc3NlczogJ3Byb3NlIHByb3NlLXNtIG0tYXV0byB0ZXh0LWxlZnQnLFxuICAgICAgaGVhZEVuYWJsZWQ6IHRydWUsXG4gICAgICBtYXJrZG93bkl0U2V0dXAobWQpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9wcmlzbWpzLmNvbS9cbiAgICAgICAgbWQudXNlKFNoaWtpLCB7XG4gICAgICAgICAgdGhlbWU6IHtcbiAgICAgICAgICAgIGxpZ2h0OiAndml0ZXNzZS1saWdodCcsXG4gICAgICAgICAgICBkYXJrOiAndml0ZXNzZS1kYXJrJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICBtZC51c2UoTGlua0F0dHJpYnV0ZXMsIHtcbiAgICAgICAgICBtYXRjaGVyOiAobGluazogc3RyaW5nKSA9PiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QobGluayksXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICAgICAgICByZWw6ICdub29wZW5lcicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tcHdhXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5zdmcnLCAnc2FmYXJpLXBpbm5lZC10YWIuc3ZnJ10sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnWGFuYWR1JyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ1hhbmFkdScsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL3B3YS0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvcHdhLTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9wd2EtNTEyeDUxMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSBtYXNrYWJsZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaW50bGlmeS9idW5kbGUtdG9vbHMvdHJlZS9tYWluL3BhY2thZ2VzL3ZpdGUtcGx1Z2luLXZ1ZS1pMThuXG4gICAgVnVlSTE4bih7XG4gICAgICBydW50aW1lT25seTogdHJ1ZSxcbiAgICAgIGNvbXBvc2l0aW9uT25seTogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbG9jYWxlcy8qKicpXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1pbnNwZWN0XG4gICAgLy8gVmlzaXQgaHR0cDovL2xvY2FsaG9zdDozMzMzL19faW5zcGVjdC8gdG8gc2VlIHRoZSBpbnNwZWN0b3JcbiAgICBJbnNwZWN0KCksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2ViZmFuc3Bsei92aXRlLXBsdWdpbi12dWUtaW5zcGVjdG9yXG4gICAgSW5zcGVjdG9yKHtcbiAgICAgIHRvZ2dsZUJ1dHRvblZpc2liaWxpdHk6ICduZXZlcicsXG4gICAgfSksXG4gIF0sXG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0XG4gIHRlc3Q6IHtcbiAgICBpbmNsdWRlOiBbJ3Rlc3QvKiovKi50ZXN0LnRzJ10sXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgZGVwczoge1xuICAgICAgaW5saW5lOiBbJ0B2dWUnLCAnQHZ1ZXVzZScsICd2dWUtZGVtaSddLFxuICAgIH0sXG4gIH0sXG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtc3NnXG4gIHNzZ09wdGlvbnM6IHtcbiAgICBzY3JpcHQ6ICdhc3luYycsXG4gICAgZm9ybWF0dGluZzogJ21pbmlmeScsXG4gICAgb25GaW5pc2hlZCgpIHsgZ2VuZXJhdGVTaXRlbWFwKCkgfSxcbiAgfSxcblxuICBzc3I6IHtcbiAgICAvLyBUT0RPOiB3b3JrYXJvdW5kIHVudGlsIHRoZXkgc3VwcG9ydCBuYXRpdmUgRVNNXG4gICAgbm9FeHRlcm5hbDogWyd3b3JrYm94LXdpbmRvdycsIC92dWUtaTE4bi9dLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1AsT0FBTyxVQUFVO0FBQ3JRLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGNBQWM7QUFDckIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxlQUFlO0FBQ3RCLFNBQVMsb0JBQW9CO0FBbEI3QixJQUFNLG1DQUFtQztBQW9CekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDeEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFFTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFFTixPQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUFBLFVBQVFBLE1BQUssUUFBUSxXQUFXLEVBQUU7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFFUixVQUFVO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDUCxLQUFLLElB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
