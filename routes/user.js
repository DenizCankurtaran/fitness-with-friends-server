const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

router.get('/one/', async(req, res) => {
  let [err, user] = await UserService.findUserById(req.body.query._id);
  if (err) {
      res.status(500);
      res.json({
          status: false,
          error: err.message,
          stack: process.env.NODE_ENV === 'production' ? '' : err.stack
      })
  } else {
      res.status(202);
      res.json({
          status: true,
          user: user
      });
  }
});

router.put('/update/', async (req, res) => {
  let {user, upUser, update} = req.body;
  if (user._id === upUser._id ) {
      let [err, user] = await UserService.updateUser(upUser._id, update);
      if (err) {
          res.status(500);
          res.json({
              status: false,
              error: err.message,
              stack: process.env.NODE_ENV === 'production' ? '' : err.stack
          })
      } else {
          res.status(202);
          res.json({
              status: true,
              updatedUser: user
          });
      }
  } else {
      res.status(403);
      res.json({
          status: false,
          error: 'not allowed'
      });
  }

});

router.delete('/delete/', async (req, res) => {
  let {user, delUser} = req.body;
  if(user._id === delUser._id){
      let [err, user] = await UserService.deleteUser(delUser._id);

      if (err) {
          res.status(500);
          res.json({
              status: false,
              error: err.message,
              stack: process.env.NODE_ENV === 'production' ? '' : err.stack
          });
      } else {
          res.status(202);
          res.json({
              status: true,
              user: user
          });
      }
  }else {
      res.status(403);
      res.json({
          status: false,
          error: 'not allowed'
      });
  }
  
});

module.exports = router;

