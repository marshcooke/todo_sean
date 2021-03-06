myApp.controller('HomeController', function (UserService) {
  // console.log('HomeController created');
  var vm = this;

  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.allTasksObj = UserService.allTasksObj;

  vm.getTasks = function () {
    UserService.getTasks();
    console.log('tasks: ', vm.allTasksObj);
  }

  vm.addTask = function (task) {
    UserService.addTask(task);
    console.log('add task hit in hc');
    vm.getTasks();
  }

  // THESE CAN BE ADDED BACK IN WHEN THE HANDLERS ARE ACTUALLY ENABLED/SET UP
  // vm.incompleteTask = function (task) {
  //   UserService.incompleteTask(task);
  //   console.log('change from incomplete to complete');
  //   vm.getTasks();
  // }

  // vm.completeTask = function (task) {
  //   UserService.completeTask(task);
  //   console.log('change from complete to incomplete');
  //   vm.getTasks();
  // }

});
