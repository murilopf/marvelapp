import React from "react";
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core';
import theme from '../styles/theme';
import Header from '../components/Header';
import MainContainer from "../components/MainContainer";

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Head>
          <title>Marvel Comics</title>
          <meta name="description"
            content="This project uses the Marvel API to create a list of all Marvel comics" />
        </Head>

        <main>
          <Header />
          <MainContainer />
        </main>

      </div>
    </ThemeProvider>
  );
}

export default Home
