import React from 'react';
import axios from 'axios';

import Link from 'next/link';
import Head from 'next/head';

import withAnalytics from '~/hocs/withAnalitics';

const Users = ({ users }) => (
<div>
  <Head>
    <title>Usuarios</title>
  </Head>
  <ul>
    {
    users.map(user => (
    <li key={users.id}>
      {user.login}
      <Link href={`/users/${user.login}`}>
        <a>Acessar Perfil</a>
      </Link>
      </li>
    ))
    }
  </ul>

  <Link href="/">
    <a>Voltar</a>
  </Link>
</div>
);

Users.getInitialProps = async () => {
 const response = await axios.get(
   'https://api.github.com/orgs/rocketseat/members'
 )

 return {users: response.data}
}

export default withAnalytics()(Users);
