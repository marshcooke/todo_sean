myApp.controller('HomeController', function (UserService) {
  console.log('HomeController created');
  var vm = this;

  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.allTasksObj = UserService.allTasksObj;

  // vm.addTask = function (task) {
  //   UserService.addTask(task);
  //   console.log('add task hit in hc');
  // }

  vm.getTasks = function () {
    UserService.getTasks();
    console.log('tasks: ', vm.allTasksObj);
  }

});