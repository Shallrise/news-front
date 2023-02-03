import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import  IconsResolver  from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


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
    })
  ],
  resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, "./src") },
       ],
     },
     server: {
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          prot:3001,
          rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
        }
      }
    }
})
