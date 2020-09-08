import React from 'react';
import axios from 'axios';

import withAnalytics from '~/hocs/withAnalitics';

const Detail = ({user}) => (
  <div>
    <h1>{user.login}</h1>
    <img src={user.avatar_url} alt="avatar" width="250"/>
  </div>
);

Detail.getInitialProps = async ({query}) => {
   const { user } = query;

   const response = await axios.get(
     `https://api.github.com/users/${user}`
   );

   return {user: response.data}
};

export default withAnalytics()(Detail);
