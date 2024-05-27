import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin=''
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />

          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/favicon/apple-touch-icon.png?v=2'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon/favicon-32x32.png?v=2'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon/favicon-16x16.png?v=2'
          />
          <link rel='manifest' href='/favicon/site.webmanifest?v=2' />
          <link
            rel='mask-icon'
            href='/favicon/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <link rel='shortcut icon' href='/favicon/favicon.ico?v=2' />

          <meta name='apple-mobile-web-app-title' content='EuraTech' />
          <meta name='application-name' content='EuraTech' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta
            name='msapplication-config'
            content='/favicon/browserconfig.xml?v=2'
          />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
