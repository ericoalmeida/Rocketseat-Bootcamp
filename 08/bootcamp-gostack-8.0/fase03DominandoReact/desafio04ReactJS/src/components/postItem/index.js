import React from 'react';

import PostHeader from '../postHeader';
import PostComments from '../postComments';

function PostItem({author, date, content, comments}){
  return(
    <div className="post">
      <PostHeader author={author} date={date} />
      <p className="post-content">{content}</p>
      <PostComments comments={comments} />
    </div>
  );
}


export default PostItem;