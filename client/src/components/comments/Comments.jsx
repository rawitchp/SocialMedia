import React, { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';

function Comments({ postId, profilePic }) {
  const { currentUser } = useContext(AuthContext);

  const [desc, setDesc] = useState('');

  const { isLoading, error, data } = useQuery(['comments'], () =>
    makeRequest.get('/comments?postId=' + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post('/comments', newComment);
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
    mutation.mutate({ desc, postId });
    setDesc('');
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={'../upload/' + profilePic} alt="" />
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
              <img src={'../upload/' + comment.profilePic} alt="" />
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
