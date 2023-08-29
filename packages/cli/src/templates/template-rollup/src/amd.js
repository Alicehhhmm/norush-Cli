// # src/amd.js

define(["dependency1", "dependency2"], function (dependency1, dependency2) {
  // 在这里编写模块的代码
  function myFunction() {
    // 使用依赖模块的功能
    dependency1.doSomething();
    dependency2.doSomethingElse();
  }

  // 导出模块的公共接口
  return {
    myFunction: myFunction,
  };
});
