import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';
import Head from 'next/head';

import withAnalytics from '~/hocs/withAnalitics';

const Title = styled.h1`
 color: #069;
 font-size: 40px;
`;

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <img src="/static/docker-logo.png" alt="docker" width="250" />
    <Title>Faaala Dev!</Title>

    <Link href="/users">
     <a>Usuarios</a>
    </Link>
  </ div>
);

export default withAnalytics()(Home);