const express = require('express');
const router = express.Router();
const CategoryService = require('../services/CategoryService');


router.post('/create/', async (req, res) => {
  if (req.body.user.isAdmin){
    let {name} = req.body.category;
    let [err, category] = await CategoryService.createCategory({
        name
    });
    if (err) {
        res.status(500);
        res.json({
            status: false,
            error: err.message,
            stack: process.env.NODE_ENV === 'production' ? '' : err.stack
        })
    } else {
        res.json({
            status: true,
            category
        })
    }
  } else {
    res.json({
      status: false,
      error: 'not allowed'
    })
  }
});

router.get('/all/', async (req, res) => {
  const [err, categories] = await CategoryService.getAllCategories();
  res.json({
    status: true,
    categories
  })
});


module.exports = router;

