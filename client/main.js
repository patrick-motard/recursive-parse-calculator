$(document).ready(function() {
  var myViewModel = function() {
    var vm = this;
    vm.operators = ko.observableArray(["+", "-", "/", "*", "CE", "DEL"])
    vm.numbers = ko.observableArray([0,1,2,3,4,5,6,7,8,9]);
    vm.keyPress = function(data, event){
       
    };
    vm.answer = ko.computed(function(){
      
    }, vm);
    vm.input = ko.observable("");
    vm.parse = function(element, index, array){
      
    };
    vm.equation = ko.computed(function(){
      var chars = vm.input().split("");
      chars.forEach(vm.parse);
    }, vm);

    vm.addToInput = function(charPressed){
      var charPressedIsOperator = _.contains(vm.operators(), charPressed);
      
      var lastChar = _.last(vm.input());
      
      if(!lastChar && charPressedIsOperator){vm.input(vm.input()+charPressed)}
      
      var lastCharIsOperator = _.contains(vm.operators(), lastChar);

      if(charPressedIsOperator && vm.input().length === 0){return;}
      
      if(lastCharIsOperator && charPressedIsOperator){return;}
      
      vm.input(vm.input() + charPressed);
    };
  };
  ko.applyBindings(myViewModel, document.getElementById("calculator"))
})