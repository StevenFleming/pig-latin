// Backend Logic

var vowels = ["a", "e", "i", "o", "u", "y", "A", "E", "I", "O", "U", "Y"];
var vowelRE = /[aeiouAEIOU]/;
var wordChar = /w/i;
var ignoredChars = /\W/;

function translateToPL(str){
  var wordSplit = str.split(" ");
  var newSentence = [];
  console.log(wordSplit)
  for(var i = 0; i < wordSplit.length; i++) {

    if (wordSplit[i].match(ignoredChars)){
      return "Error: please use only word characters."
    } else {
      newSentence.push(translateWordToPL(wordSplit[i]));
    }
  }
  return newSentence.join(" ");
}


function translateWordToPL(str){

  var restOfStr = str.substr(1);
  var firstCharStr = str.charAt(0);
  var splitChar = str.split("");

  if (str.length === 1) { // one letter word
    var pigStr = str + "ay";
  } else if (firstCharStr.match(vowelRE)) { // begins with vowel
    var pigStr = str + "way";
  } else { // begins with consonant


    for (var i = 0 ; i < vowels.length ; i += 1){
      if(!firstVowelIndex) {
        if (vowels.includes(splitChar[i])){
          var firstVowelIndex = i;
          restOfStr = str.substr(i);
          firstCharStr = str.substr(0, i);
          if (firstCharStr.charAt(1) === "q" && restOfStr.charAt(0) === "u"){
            firstCharStr = firstCharStr + "u";
            restOfStr = restOfStr.substr(1);
            //console.log(restOfStr + firstCharStr + "ay")
          }
        } 
      }
    }

    
    var pigStr = restOfStr + firstCharStr + "ay";
  }
  return pigStr;
}


// User Interface Logic

$(document).ready(function() {
  $("#translateForm").submit(function(event) {
    event.preventDefault();

    var input = $("#inputText").val();

    var output = translateToPL(input);
    $("#output").text(`Translation: ${output}`);
  })
})