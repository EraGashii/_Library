import MainLayout from "@/components/MainLayout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  let title =pageProps.title ? pageProps.title : "My Platform";
  let description = pageProps.description ? pageProps.description
  : "My Platform description";
  let image = pageProps.image ? pageProps.image :  "https://my-domain/meta.svg";
  let url = pageProps.url ? pageProps.url : "https://my-domain.com";
  return (
    <>
      <Head>
        <title>{Component.displayName}</title>
        <meta 
        name="viewport"
        content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device"
        />
        <meta 
        httpEquiv="Content-Seciurity-Policy"
        content="ubgrade-insecure-request"
        />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="{fb-id}" />

        {/*SEO for web*/}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="url" content={url} />
        <meta name="image" content={image} />
        <meta name="image:source" content={image} />

        {/*SEO for Facebook*/}
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:url" content={url}/>
        <meta property="og:image" content={image}/>
        <meta property="og:image:source" content={image}/>
        {/*SEO for Twitter*/}
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:url" content={url}/>
        <meta name="twitter:image" content={image}/>
        <meta name="twitter:image:source" content={image}/>
      </Head>
      <MainLayout name={Component.displayName}>
        <Component {...pageProps} />
        </MainLayout>
    </>
  );
  
}