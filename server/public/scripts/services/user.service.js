myApp.service('UserService', function ($http, $location) {

  var self = this;

  self.userObject = {};
  self.allTasksObj = { task: [] };

  self.getuser = function () {
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
    $http.get('/home/logout').then(function (response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/login");
    });
  }

  self.getTasks = function () {
    console.log('In getTasks');
    $http({
      method: 'GET',
      url: '/home/home'
    }).then(function (response) {
      console.log('response is: ', response.data);
      self.allTasksObj.task = response.data;
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

  // self.incompleteTask = function (task) {
  //   $http({
  //     method: 'UPDATE',
  //     url: '/home/' + task,
  //     data: [task]
  //   }).thent(function (response) {
  //     console.log('incomplete update response is: ', response);
  //   });
  // }

  // self.completeTask = function (task) {
  //   $http({
  //     method: 'UPDATE',
  //     url: '/home',
  //     data: [task]
  //   }).thent(function (response) {
  //     console.log('complete update response is: ', response);
  //   });
  // }

  // self.deleteTasks = function (task) {
  //   console.log('In deleteTasks');
  //   $http({
  //     method: 'DELETE',
  //     url: '/home/' + task,
  //   }).then(function (response) {
  //     console.log('response is: ', response.data);
  //   });
  // }

});
