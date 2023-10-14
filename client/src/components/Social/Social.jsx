import React, { useEffect, useState } from 'react';

import './Social.scss';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';
import Person from '../Person/Person';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

function Social() {
  const [data, setData] = useState([]);

  const [id, setId] = useState(0);
  const location = useLocation();
  async function fetch() {
    try {
      const { access_token, id } = await JSON.parse(
        localStorage.getItem('user')
      );
      setId(id);
      const res = await makeRequest.get('/users', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      let x = res.data.filter((user) => user.id !== id);

      if (location.state?.search) {
        x = x.map((user) => {
          if (user.name.includes(location.state.search)) {
            return { ...user, isHide: false };
          }
          return { ...user, isHide: true };
        });
      }
      setData(x);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetch();
  }, [location.state?.search]);
  const navigate = useNavigate();
  function goToProfile(id) {
    navigate(`/profile/${id}`);
  }

  return (
    <div className="home">
      <div className="posts">
        {data?.map((person) => {
          if (person.isHide === undefined || !person.isHide) {
            return (
              <div
                onClick={() => goToProfile(person.id)}
                style={{ cursor: 'pointer' }}
                key={person.id}
              >
                <Person data={person} key={person.id} />
              </div>
            );
          }
          return <span key={person.id}></span>;
        })}
      </div>
    </div>
  );
}

export default Social;
