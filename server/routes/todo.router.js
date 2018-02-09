var router = require('express').Router();
var pool = require('../modules/pool');
var bodyParser = require('body-parser');

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('user is logged in');
        console.log('in get / function');
        pool.connect(function (connectionError, client, done) {
            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(500);
            } else {
                client.query('SELECT * FROM tasks', function (queryError, resultsObj) {
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
        console.log('user is logged in', req.user);
        var userId = req.user.id;
        var taskId = req.body[0].id;
        console.log('in post / function, req.body: ', req.body);
        pool.connect(function (connectionError, client, done) {
            if (connectionError) {
                console.log(connectionError);
                res.sendStatus(500);
            } else {
                var queryString = 'INSTERT INTO users_tasks (users_id, tasks_id) VALUES ($1, $2) RETURNING tasks_id;';
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
//     if (req.isAuthenticated()) {
//         console.log('user is logged in', req.user);
//         var userId = req.user.id;
//         var taskId = req.params.id;
//         console.log('in delete / function, req. params: ', req.params.id);
//         pool.connect(function (connectionError, client, done) {
//             if (connectionError) {
//                 console.log(connectionError);
//                 res.sendStatus(500);
//             } else {
//                 var queryString = 'DELETE FROM users_tasks WHERE users_id = $1 AND tasks_id = $2;';
//                 var values = [userId, tasksId];
//                 client.query(queryString, values, function (queryError, resultsObj) {
//                     done();
//                     if (queryError) {
//                         console.log(queryError);
//                         res.sendStatus(500);
//                     } else {
//                         console.log('resultsObj: ', resultsObj);
//                         res.sendStatus(201);
//                     }
//                 });
//             }
//         });
//     } else {
//         console.log('not logged in');
//         res.send(false);
//     }
// });

module.exports = router;