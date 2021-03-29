import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './contexts/LocalStorage'
import PairDataContextProvider, { Updater as PairDataContextUpdater } from './contexts/PairData'
import ThemeProvider, { GlobalStyle } from './Theme'
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from './contexts/TokenData'

import App from './App'
import ApplicationContextProvider from './contexts/Application'
import GlobalDataContextProvider from './contexts/GlobalData'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import UserContextProvider from './contexts/User'
import { isMobile } from 'react-device-detect'

if (window.location.hostname.includes('zero')) {
  window.location.href = window.location.href.replace('zero', '0');
}

// initialize GA
const GOOGLE_ANALYTICS_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID)
  ReactGA.set({
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
      ? 'mobileWeb3'
      : 'mobileRegular',
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

function ContextProviders({ children }) {
  return (
    <LocalStorageContextProvider>
      <ApplicationContextProvider>
        <TokenDataContextProvider>
          <GlobalDataContextProvider>
            <PairDataContextProvider>
              <UserContextProvider>{children}</UserContextProvider>
            </PairDataContextProvider>
          </GlobalDataContextProvider>
        </TokenDataContextProvider>
      </ApplicationContextProvider>
    </LocalStorageContextProvider>
  )
}

function Updaters() {
  return (
    <>
      <LocalStorageContextUpdater />
      <PairDataContextUpdater />
      <TokenDataContextUpdater />
    </>
  )
}

ReactDOM.render(
  <ContextProviders>
    <Updaters />
    <ThemeProvider>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  </ContextProviders>,
  document.getElementById('root')
)
