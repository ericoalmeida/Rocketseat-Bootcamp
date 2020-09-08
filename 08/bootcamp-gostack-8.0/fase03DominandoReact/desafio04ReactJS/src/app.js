import React from 'react';

import '../src/app.css';

import Header from './components/header';
import PostList from './components/postList'

function App(){
   return (
     <>
       <Header />
       <PostList />
    </>
    )
}

export default App;