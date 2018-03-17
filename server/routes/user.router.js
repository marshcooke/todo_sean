var express = require('express');
var pool = require('../modules/pool');
var router = express.Router();
var bodyParser = require('body-parser');

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  console.log('get /home route');
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.get('/home', function (req, res) {
  if (req.isAuthenticated()) {
    console.log('user is logged in with GET ROUTE user router');
    var userId = req.user.id;
    console.log('user id?', userId);
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        client.query('SELECT * FROM users_tasks INNER JOIN tasks ON users_tasks.tasks_id = tasks.id WHERE users_id = $1;', [userId], function (queryError, resultsObj) {
          done();
          if (queryError) {
            console.log(queryError);
            res.sendStatus(500);
          } else {
            console.log('resultsObj.rows: ', resultsObj.rows);
            res.send(resultsObj.rows);
          }
        });
      }
    });
  } else {
    console.log('not logged in');
    res.send(false);
  }
});

router.post('/', function (req, res) {
  if (req.isAuthenticated()) {
    console.log('user is logged in in router.post/home', req.user);
    var userId = req.user.id;
    var tasksId = req.body[0];
    console.log('in post function userId, tasksId: ', userId, tasksId);
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        var queryString = 'INSERT INTO users_tasks (users_id, tasks_id) VALUES ($1, $2) RETURNING tasks_id;';
        var values = [userId, tasksId];
        client.query(queryString, values, function (queryError, resultsObj) {
          done();
          if (queryError) {
            console.log(queryError);
            res.sendStatus(500);
          } else {
            console.log('resultsObj: ', resultsObj);
            res.sendStatus(201);
          }
        });
      }
    });
  } else {
    console.log('not logged in');
    res.send(false);
  }
});

// router.delete('/:id', function (req, res) {
//   if (req.isAuthenticated()) {
//     console.log('user is logged in', req.user);
//     var userId = req.user.id;
//     var taskId = req.params.id;
//     console.log('in delete / function, req. params: ', req.params.id);
//     pool.connect(function (connectionError, client, done) {
//       if (connectionError) {
//         console.log(connectionError);
//         res.sendStatus(500);
//       } else {
//         var queryString = 'DELETE FROM users_tasks WHERE users_id = $1 AND tasks_id = $2;';
//         var values = [userId, tasksId];
//         client.query(queryString, values, function (queryError, resultsObj) {
//           done();
//           if (queryError) {
//             console.log(queryError);
//             res.sendStatus(500);
//           } else {
//             console.log('resultsObj: ', resultsObj);
//             res.sendStatus(201);
//           }
//         });
//       }
//     });
//   } else {
//     console.log('not logged in');
//     res.send(false);
//   }
// });

module.exports = router;