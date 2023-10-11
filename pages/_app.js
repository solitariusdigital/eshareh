import RootLayout from "@/components/RootLayout";
import { StateProvider } from "@/context/stateContext";
import { DefaultSeo } from "next-seo";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <RootLayout>
        <DefaultSeo
          title="کلینیک تخصصی زیبایی بل کلاس"
          description="نگهبان زندگی"
          openGraph={{
            type: "website",
            locale: "fa_IR",
            url: "https://eshareh.com",
            siteName: "Eshareh",
          }}
        />
        <Component {...pageProps} />
      </RootLayout>
    </StateProvider>
  );
}
