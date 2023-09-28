import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const userController = {
  getUser(req, res) {
    const userId = req.params.userId;
    const q = 'SELECT * FROM users WHERE id = ?';
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json(info);
    });
  },
  updateUser(req, res) {
    const userId = req.params.userId;

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, 'secretkey', (err, userInfo) => {
      if (err) return res.status(403).json('Token is invalid!');
      const q =
        'UPDATE users SET `name` = ?,`city` = ?,`website` = ?,`profilePic` = ?,`coverPic` = ? WHERE id = ?';
      db.query(
        q,
        [
          req.body.name,
          req.body.city,
          req.body.website,
          req.body.profilePic,
          req.body.coverPic,
          userInfo.id,
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.affectedRows > 0) return res.json('Updated!');
          return res.status(403).json('You can update only your Post');
        }
      );
    });
  },
};
