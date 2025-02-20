import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    envPrefix: 'SD_',
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT || 3000,
      __BASE_URL__: JSON.stringify(
        mode === 'development'
          ? 'localhost'
          : process.env.SERVER_HOST ?? 'http://www.sdtest.sb-i.ru',
      ),
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'ssr.tsx'),
        name: 'Client',
        formats: ['cjs'],
      },
      rollupOptions: {
        output: {
          dir: 'dist-ssr',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
        onwarn(warning, warn) {
          // Suppress "Module level directives cause errors when bundled" warnings
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return
          }
          warn(warning)
        },
      },
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, './src/assets'),
        api: path.resolve(__dirname, './src/api'),
        pages: path.resolve(__dirname, './src/pages'),
        layouts: path.resolve(__dirname, './src/layouts'),
        components: path.resolve(__dirname, './src/components'),
        utils: path.resolve(__dirname, './src/utils'),
        static: path.resolve(__dirname, './src/static'),
        hoks: path.resolve(__dirname, './src/hoks'),
        hooks: path.resolve(__dirname, './src/hooks'),
        store: path.resolve(__dirname, './src/store'),
        storeRoles: path.resolve(__dirname, './src/store/slices/roles/'),
        storeAuth: path.resolve(__dirname, './src/store/slices/auth/'),
        storeStructure: path.resolve(
          __dirname,
          './src/store/slices/structure/',
        ),
        themes: path.resolve(__dirname, './src/themes/'),
      },
    },
  }
})
