import type { AppProps } from 'next/app';

import DisableAnimationsOnResize from '~/components/UI/DisableAnimationsOnResize/DisableAnimationsOnResize';

import '../styles/globals.scss';

function DemoApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DisableAnimationsOnResize />
      <Component {...pageProps} />
    </>
  );
}

export default DemoApp;
