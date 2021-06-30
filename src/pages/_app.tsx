import Router from 'next/router';

import * as gtag from '../lib/gtag'

import '../styles/global.scss';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp
