import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Import Google Font Libre Baskerville */}
 <link
  href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap"
  rel="stylesheet"
/>

      </Head>
      <body className="antialiased font-serif">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
