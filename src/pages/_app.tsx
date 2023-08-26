import { AppProps } from "next/app";
import RootProvider from "@/providers/providers";
import Layout from "@/components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RootProvider>
  );
};

export default App;
