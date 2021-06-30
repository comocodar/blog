import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useAmp } from 'next/amp';

import AmpAnalytics from '@/components/amp/AmpAnalytics';

import { GA_TRACKING_ID } from '@/lib/gtag';

type AmpWrapProps = {
  ampOnly?: any;
  nonAmp?: any;
}

function AmpWrap({ ampOnly, nonAmp }: AmpWrapProps) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly
  return !isAmp && nonAmp
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&family=Roboto:wght@400;500&display=swap" rel="stylesheet" /> 
        </Head>
        <body>
          <Main />
          <NextScript />

           {/* AMP - Google Analytics */}
           <AmpWrap
            ampOnly={
              <AmpAnalytics
                type="googleanalytics"
                script={{
                  vars: {
                    account: GA_TRACKING_ID,
                    gtag_id: GA_TRACKING_ID,
                    config: {
                      [GA_TRACKING_ID]: { groups: 'default' },
                    },
                  },
                  triggers: {
                    trackPageview: {
                      on: 'visible',
                      request: 'pageview',
                    },
                  },
                }}
              />
            }
          />

          {/* Non-AMP - Google Analytics */}
          <AmpWrap
            nonAmp={
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}');
                    `,
                  }}
                />
              </>
            }
          />
        </body>
      </Html>
    );
  }
}
