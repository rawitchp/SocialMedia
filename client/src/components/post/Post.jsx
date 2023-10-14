import React, { useContext, useEffect, useState } from 'react';
import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

function Post({ post }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const [countComments, setCountComments] = useState(false);

  async function fetchComments() {
    const { access_token } = await JSON.parse(localStorage.getItem('user'));
    const res = await makeRequest
      .get('/comments?postId=' + post.id, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        return res.data;
      });
    setCountComments(res.length);
  }

  const { isLoading, error, data } = useQuery(['likes', post.id], async () => {
    const { access_token } = await JSON.parse(localStorage.getItem('user'));
    fetchComments();
    return makeRequest
      .get('/likes?postId=' + post.id, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        return res.data;
      });
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (liked) => {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));
      if (liked)
        return makeRequest.delete('/likes?postId=' + post.id, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
      return makeRequest.post(
        '/likes',
        { postId: post.id },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['likes']);
      },
    }
  );

  const handleLike = async () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  // const { isCommentLoading, commentError, commentData } = useQuery(
  //   ['comments'],
  //   async () => {
  //     const { access_token } = await JSON.parse(localStorage.getItem('user'));

  //     return makeRequest
  //       .get('/comments?postId=' + postId, {
  //         headers: { Authorization: `Bearer ${access_token}` },
  //       })
  //       .then((res) => {
  //         return res.data;
  //       });
  //   }
  // );

  const deleteMutation = useMutation(
    async (postId) => {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));
      return makeRequest.delete('/posts/' + postId, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post?.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              'loading...'
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: 'red' }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {countComments} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && (
          <Comments
            postId={post.id}
            profilePic={post.profilePic}
            setCountComments={setCountComments}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
