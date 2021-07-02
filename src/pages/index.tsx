import React from "react";
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Marvel Comics</title>
        <meta name="description" content="This project uses the Marvel API to create a list of all Marvel comics" />
      </Head>

      <main>
        <h1>Dextra 🤝 Marvel Comics</h1>
      </main>

    </div>
  );
}

export default Home
