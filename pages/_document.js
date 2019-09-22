import Document, { Html, Head, Main, NextScript } from "next/document";
import { TypographyStyle, GoogleFont } from "react-typography";
import Typography from "typography";
import lincolnTheme from "typography-theme-lincoln";
import { ServerStyleSheet } from "styled-components";
const typography = new Typography(lincolnTheme);

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="Rent Cap" />
          <meta property="og:site_name" content="Rent Cap" />
          <meta property="og:url" content="https://rentcap.info" />
          <meta
            property="og:description"
            content="Are you a California resident who wants to know whether your rent is protected under rent control or the new Tenant Protections Act? Rent Cap can help you find out!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/static/rentcap.svg" />
          <link rel="icon" href="/static/rentcap.svg" type="image/svg+xml" />
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
        </Head>
        <body>
          <Main>
            <NextScript />
          </Main>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
