import React, { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';

function Comments({ postId, profilePic, setCountComments }) {
  const { currentUser } = useContext(AuthContext);

  const [desc, setDesc] = useState('');

  const { isLoading, error, data } = useQuery(
    ['comments', postId],
    async () => {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));
      return makeRequest
        .get('/comments?postId=' + postId, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          setCountComments(res.data.length);
          return res.data;
        });
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (newComment) => {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));

      return makeRequest.post('/comments', newComment, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['comments']);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    if (desc === '') {
      return;
    }
    mutation.mutate({ desc, postId });
    setDesc('');
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? 'loading...'
        : data?.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}

export default Comments;
