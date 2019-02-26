myApp.controller('LoginController', function ($http, $location, UserService) {
  var vm = this;

  vm.user = {
    username: '',
    password: ''
  };
  vm.message = '';

  vm.login = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username & password!";
    } else {
      // console.log('LoginController -- login -- sending to server: ', vm.user.username);
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          // console.log('LoginController -- login -- success: ', response.data.username);
          // location works with SPA (ng-route)
          $location.path('/home'); // http://localhost:5556/#/home
        } else {
          console.log('LoginController -- login -- failure: ', response);
          vm.message = "Wrong!";
        }
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- failure: ', response);
        vm.message = "Wrong!";
      });
    }
  };

  vm.registerUser = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
    } else {
      console.log('LoginController -- registerUser -- sending to server...', vm.user);
      $http.post('/register', vm.user).then(function (response) {
        console.log('LoginController -- registerUser -- success');
        $location.path('/login');
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Please try again."
      });
    }
  }
});
