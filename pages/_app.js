// pages/_app.js
import React from "react";
import App from "next/app";
import Head from "next/head";
// import styled from "@emotion/styled";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 16px repeat(4, 1fr) 16px;
  grid-template-rows: 60px auto auto;
  min-height: 100vh;
  grid-template-areas:
    "hd  hd   hd   hd   hd   hd"
    "... main main main main ..."
    "ft  ft   ft   ft   ft   ft";
  @media (min-width: 980px) {
    grid-template-columns: 2fr repeat(12, 1fr) 2fr;
    grid-template-areas:
      "hd  hd   hd   hd   hd   hd   hd   hd   hd   hd   hd   hd   hd   hd"
      "... main main main main main main main main main main main main ..."
      "ft  ft   ft   ft   ft   ft   ft   ft   ft   ft   ft   ft   ft   ft";
  }
  header {
    grid-area: hd;
  }
  main {
    grid-area: main;
  }
  footer {
    grid-area: ft;
  }
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Rent Cap</title>
        </Head>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </Container>
    );
  }
}
