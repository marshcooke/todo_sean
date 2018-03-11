myApp.controller('DoitController', function (UserService) {
  console.log('DoitController created');
  var vm = this;
  vm.userService = UserService;
});