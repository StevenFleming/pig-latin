// Backend Logic

var vowelRE = /[aeiou]/i;
var vowelPlusYRE = /[aeiouy]/i;
//var wordChar = /^[\\w'-]/i;
var ignoredChars = /\W/;

function translateToPL(str){
  var wordSplit = str.split(" ");
  var newSentence = [];
  for(var i = 0; i < wordSplit.length; i++) {
    // if (wordSplit[i].match(ignoredChars)){
    //   return "Error: please use only word characters."
    // } 
    //else {
      newSentence.push(translateWordToPL(wordSplit[i]));
    //}
  }
  return newSentence.join(" ");
}

function translateWordToPL(str){
  var restOfStr = str.substr(1);
  var firstCharStr = str.charAt(0);
  var splitChar = str.split("");
  if (str.length === 0) {
    return "";
  } else if (str.length === 1) { // one letter word
    var pigStr = str + "ay";
  } else if (firstCharStr.match(vowelRE)) { // begins with vowel
    var pigStr = str + "way";
  } else { // begins with consonant
    var firstVowelIndex = restOfStr.search(vowelPlusYRE);
    restOfStr = str.substr(firstVowelIndex + 1);
    var firstConsonantGroup = str.substr(0, firstVowelIndex + 1);
    // exception for "qu" groups
    if (firstConsonantGroup.charAt(firstConsonantGroup.length - 1) === "q" && restOfStr.charAt(0) === "u"){
      firstConsonantGroup = firstConsonantGroup + "u";
      restOfStr = restOfStr.substr(1);
    }
    var pigStr = restOfStr + firstConsonantGroup + "ay";
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