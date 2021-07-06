import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import MainContainer from '../components/MainContainer'

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Marvel Comics</title>
      <meta
        name='description'
        content='This project uses the Marvel API to create a list of all Marvel comics'
      />
    </Head>

    <main>
      <Header />
      <MainContainer />
    </main>
  </div>
)

export default Home
