import React, { useState } from 'react';
import { makeRequest } from '../../axios';
import './update.scss';
import { useMutation, useQueryClient } from 'react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Update(props) {
  const { setOpenUpdate, user } = props;
  const [texts, setTexts] = useState({ name: '', city: '', website: '' });
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const upload = async (file) => {
    try {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post('/upload', formData, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (user) => {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));

      return makeRequest.put('/users', user, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['user']);
      },
    }
  );

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update</h1>
        <form>
          <label>
            Cover Picture{' '}
            <div className="imgContainer">
              <img src={user.coverPic} alt="" />
            </div>
          </label>
          <input
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
            className="files"
          />

          <label>
            Profile Picture{' '}
            <div className="imgContainer">
              <img src={user.profilePic} alt="" />
            </div>
          </label>
          <input
            type="file"
            onChange={(e) => setProfile(e.target.files[0])}
            className="files"
          />

          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} />
          <label>City</label>
          <input type="text" name="city" onChange={handleChange} />
          <label>Website</label>
          <input type="text" name="website" onChange={handleChange} />
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          X
        </button>
      </div>
    </div>
  );
}

export default Update;
