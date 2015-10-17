$(document).ready(function() {
  var myViewModel = function() {
    var vm = this;
    vm.operators = ko.observableArray(["+", "-", "/", "*", "CE", "DEL"])
    vm.numbers = ko.observableArray(["0","1","2","3","4","5","6","7","8","9","."]);
    vm.keyPress = function(data, event){
       
    };
    
    vm.input = ko.observable("");
    vm.output = "";
    
    vm.parse = function(arr, out){
      if(arr.length === 0) {return out}

      var isNumOrDec = _.contains(vm.numbers(), arr[0]);
      
      if(isNumOrDec){
        out += arr[0];
        var remaining = _.rest(arr);
        return vm.parse(remaining, out);
      }
      if(_.contains(vm.operators(), arr[0]) && arr.length > 1){
        var num, rest, restNum;
        if(arr[0] === "+"){
          num  = parseFloat(out);
          rest = vm.parse(_.rest(arr), 0);
          restNum = parseFloat(rest);
          return parseFloat(num + restNum); 
        }
        if(arr[0] === "-"){
          num  = parseFloat(out);
          rest = vm.parse(_.rest(arr), 0);
          restNum = parseFloat(rest);
          return parseFloat(num - restNum); 
        }
      }
      return out;
    };
    vm.answer = ko.computed(function(){
      var output = vm.parse(vm.input(), "0");
      return output;
    }, vm);


    // vm.equation = ko.computed(function(){
    //   var chars = vm.input().split("");
    //   chars.forEach(vm.parse);
    // }, vm);

    vm.addToInput = function(charPressed){
      var charPressedIsOperator = _.contains(vm.operators(), charPressed),
          lastChar = _.last(vm.input()),
          lastCharIsOperator = _.contains(vm.operators(), lastChar);
      
      // "" -> op -> ret
      // "" -> num -> push
      if(!vm.input()){
        if(_.contains(vm.numbers(), charPressed)){
          if(charPressed === "."){
            vm.input("0.");
          }else{
            vm.input(vm.input()+charPressed);  
          }
          return;
        }
        return;
      }
      
      // any -> "." -> 
      if(charPressed === "."){
        // go backwards through input
        for(var i = vm.input().length - 1; i >= 0; i--){
          // if you find a period
          if(vm.input()[i] === "."){
            // go forward from that point
            for(var j = i+1; j < vm.input().length; j++){
              // if you find an operator
              if(_.contains(vm.operators(),vm.input()[j])){
                // push the decimal and return
                vm.input(vm.input() + charPressed);
                return;
              }
            }
            // else return
            return;
          }  
        }
      }
      
      if(charPressed === "DEL"){
        vm.input(vm.input().slice(0, -1));
        return;
      }
      
      if(charPressed === "CE"){vm.input(""); return;}
      
      if((lastCharIsOperator || lastChar === ".") && charPressedIsOperator){return;}
      
      vm.input(vm.input() + charPressed);
    };
  };
  ko.applyBindings(myViewModel, document.getElementById("calculator"))
})