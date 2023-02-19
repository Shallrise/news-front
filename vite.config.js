import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import  IconsResolver  from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers:[
        IconsResolver({
          prefix:'Icon'
        }),
        ElementPlusResolver()
      ]
    }),
    Components({
      resolvers:[
        IconsResolver({
          enabledCollections:['ep']
        }),
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall:true
    }),
    VueSetupExtend()
  ],
  resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, "./src") },
       ],
     },
     server: {
      proxy: {
        '/api': {
          target: 'http://114.132.231.34:10010/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
        }
      }
    },
    optimizeDeps: {
      include: ['A']
  }
})
