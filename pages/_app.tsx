import MainLayout from "@/components/MainLayout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const title = pageProps.title ?? "My Platform";
  const description = pageProps.description ?? "My Platform description";
  const image = pageProps.image ?? "https://my-domain/meta.svg";
  const url = pageProps.url ?? "https://my-domain.com";

  // Lista e faqeve ku nuk duam layout-in (navbar-in)
  const noLayoutRoutes = ["/admin", "/client", "/client/browsebooks"];
  const hideLayout = noLayoutRoutes.some((route) =>
    router.pathname.startsWith(route)
  );

  return (
    <>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Head>
        <title>{Component.displayName ?? "My App"}</title>
       <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        )}
        {/* SEO */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="url" content={url} />
        <meta name="image" content={image} />
        <meta name="image:source" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={image} />
      </Head>

      <SessionProvider session={pageProps.session}>
        {hideLayout ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout name={Component.displayName}>
            <Component {...pageProps} />
          </MainLayout>
        )}
      </SessionProvider>
    </>
  );
}
