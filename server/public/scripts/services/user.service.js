myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');

  var self = this;

  self.userObject = {};
  self.allTasksObj = {
    task: []
  };

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/home').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/login");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/login");
    });
  }

  self.logout = function () {
    console.log('UserService -- logout');
    $http.get('/home/logout').then(function (response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/login");
    });
  }

  self.addTask = function (task) {
    $http({
      method: 'POST',
      url: '/home',
      data: [task]
    }).then(function (response) {
      console.log('post response is: ', response);
    });
  }

  self.getTasks = function () {
    console.log('In getTasks');    
    $http({
      method: 'GET',
      url: '/home'
    }).then(function (response) {
      console.log('response is: ', response);
      self.allTasksObj.task = response.data.rows;
      console.log('response.data.rows: ', self.allTasksObj.task)
    });
  }

});