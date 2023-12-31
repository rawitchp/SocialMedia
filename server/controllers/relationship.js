import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const relationshipController = {
  getRelationships(req, res) {
    const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`;
    db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data.map((relationship) => relationship.followerUserId));
    });
  },
  addRelationship(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT, (err, userInfo) => {
      if (err) return res.status(403).json('Token is invalid!');
      const q =
        'INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)';

      const values = [userInfo.id, req.body.userId];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Following');
      });
    });
  },

  deleteRelationship(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT, (err, userInfo) => {
      if (err) return res.status(403).json('Token is invalid!');
      const q =
        'DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?';

      db.query(q, [userInfo.id, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Unfollow');
      });
    });
  },
};
