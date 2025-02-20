import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store'
import ThemeWrapper from './src/themes/ThemeWrapper'
import { StaticRouter } from 'react-router-dom/server'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/css'

export function render(url: string, cache: EmotionCache) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <CacheProvider value={cache}>
          <ThemeWrapper />
        </CacheProvider>
      </StaticRouter>
    </Provider>,
  )
}

export { store }
