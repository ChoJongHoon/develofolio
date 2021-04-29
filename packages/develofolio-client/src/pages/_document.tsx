import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Helmet, { HelmetData } from "react-helmet";
import React, { JSXElementConstructor, ReactElement } from "react";
import { GlobalStyles } from "src/styles/global-styles";
import { ServerStyleSheet } from "styled-components";

type Props = {
  styleTags: ReactElement<{}, string | JSXElementConstructor<any>>[];
  helmet: HelmetData;
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();

    const page = renderPage((App) => (props) =>
      sheet.collectStyles(
        <>
          <GlobalStyles />
          <App {...props} />
        </>
      )
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, helmet: Helmet.renderStatic(), styleTags };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <Html {...htmlAttrs}>
        <Head {...bodyAttrs}>
          {this.props.styleTags}
          {Object.values(helmet).map((el) => el.toComponent())}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
