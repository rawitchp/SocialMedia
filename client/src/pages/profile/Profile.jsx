import React, { useContext, useState } from 'react';
import './Profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/Posts';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const userId = parseInt(useLocation().pathname.split('/')[2]);
  const { isLoading, error, data } = useQuery(['user'], async () => {
    const { access_token } = await JSON.parse(localStorage.getItem('user'));

    return makeRequest
      .get('/users/find/' + userId, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        return res.data;
      });
  });

  const { data: relationshipData } = useQuery(['relationship'], async () => {
    const { access_token } = await JSON.parse(localStorage.getItem('user'));
    return makeRequest
      .get('/relationships?followedUserId=' + userId, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        return res.data;
      });
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (following) => {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));

      if (following)
        return makeRequest.delete('/relationships?userId=' + userId, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
      return makeRequest.post(
        '/relationships',
        { userId },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['relationship']);
      },
    }
  );

  const handleFollow = async () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      <div className="images">
        <img src={data?.coverPic} alt="" className="cover" />
        <img src={data?.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data?.website}</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <button onClick={() => setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData?.includes(currentUser.id)
                  ? 'Following'
                  : 'Follow'}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
}

export default Profile;
