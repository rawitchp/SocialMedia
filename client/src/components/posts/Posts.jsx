import React from 'react';
import Post from '../post/Post';
import './posts.scss';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';

function Posts({ userId }) {
  const { isLoading, error, data } = useQuery(['posts'], async () => {
    const { access_token } = await JSON.parse(localStorage.getItem('user'));

    return userId
      ? makeRequest
          .get('/posts/posts?userId=' + userId, {
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((res) => {
            return res.data;
          })
      : makeRequest
          .get('/posts/posts', {
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((res) => {
            return res.data;
          });
  });

  return (
    <div className="posts">
      {data?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
