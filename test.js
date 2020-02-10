  var parameter = process.argv[2] + " " + process.argv[process.argv.length - 1];

console.log("-----------------")
console.log (parameter)
console.log("-----------------")

removeDuplicateWords = function () {
    // your perfect code...
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
 result = [];
   str = parameter.split(" ");
  

  for(var i =0; i < str.length ; i++){
      //if(result.indexOf(str[i]) == -1) result.push(str[i]);
      if(result.indexOf(str[i]) === -1){
        result.push(str[i]);
      } 
  }
   result.join(" ");
   console.log(result)
   parameter = result[0]
  console.log (parameter)
  }

removeDuplicateWords()
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
console.log(parameter)
// var wordCheck = parameter.split(",")
// console.log ("below should be array")
// console.log(wordCheck)
// console.log("-----------------")