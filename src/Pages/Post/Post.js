import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      <div class='card w-96 bg-base-100 shadow-xl'>
        <div class='card-body'>
          <p>{post.post}</p>
          <div class='card-actions justify-end'></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
