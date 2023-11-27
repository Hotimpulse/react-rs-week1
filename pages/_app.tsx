import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ReduxProvider } from '../store/ReduxProvider';
import Layout from '@/components/organisms/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}
