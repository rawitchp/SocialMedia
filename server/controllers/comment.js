import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const commentController = {
  getComments(req, res) {
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) 
      WHERE c.postId = ? 
      ORDER BY c.createdAt DESC`;
    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  },
  addComment(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT, (err, userInfo) => {
      if (err) return res.status(403).json('Token is invalid!');
      const q =
        'INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?)';

      const values = [
        req.body.desc,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        userInfo.id,
        req.body.postId,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Comment has been created!');
      });
    });
  },
};
