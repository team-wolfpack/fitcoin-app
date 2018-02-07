const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'http://184.172.234.29:31090/api'

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//Get all members
router.get('/member-detail/:id', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  var id = req.params.id;
  console.log('MEMBER ID = ' + id);
  axios.get('${API}/Member/' + id)
    .then(members => {
      res.status(200).json(members.data);      
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

//Get all members
router.get('/members', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/Member`)
    .then(members => {
      res.status(200).json(members.data);      
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;