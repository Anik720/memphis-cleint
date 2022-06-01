import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Post from '../Post/Post';

const Banner = () => {
  const [posts, setPost] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/service', {
      method: 'GET', // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('Success:', data);
        setPost(data.data.services);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  console.log(posts);
  if (!posts) {
    return <div>Loading</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = e.target.post.value;
    console.log(typeof post);

    fetch('http://localhost:5000/api/v1/service', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data.messagee);
        if (data.messagee === 'failed') {
          toast('Can not be Posted!');
        } else {
          toast('Posted!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div>
      <div
        class='hero min-h-screen'
        style={{
          backgroundImage:
            "url('https://api.lorem.space/image/fashion?w=1000&h=800')",
        }}>
        <div class='hero-overlay bg-opacity-60'></div>
        <div class='hero-content text-center text-neutral-content'>
          <div class='max-w-md'>
            <h1 class='mb-5 text-5xl font-bold'>Hello there</h1>
            <p class='mb-5'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <form onSubmit={handleSubmit}>
              <textarea
                type='text'
                placeholder='Type here'
                class='input input-bordered input-lg w-full max-w-xs text-black h-20'
                name='post'
              />
              <br />
              <button type='submit' class='btn btn-primary '>
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-10'>
        {posts?.map((post) => (
          <Post post={post}></Post>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Banner;
