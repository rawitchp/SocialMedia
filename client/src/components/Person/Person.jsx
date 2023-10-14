import React, { useContext, useEffect, useState } from 'react';
import './Person.scss';
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

function Person({ data }) {
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={data?.profilePic} alt="" />
            <div className="details">
              <span className="name">{data.name}</span>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Person;
