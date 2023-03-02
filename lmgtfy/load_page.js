var intervalTime = 300;
var forwardTime = 1000;

function loadPage() {
  var question = document.getElementById('search');
  var questionText = question.value;
  var text = "";
  var index = 0;

  question.value = "";
  question.disabled = true;
  document.getElementById('submit').disabled = true;
  var interval = setInterval(async function() {
    text += questionText[index];
    question.value = text;
    index++;

    if (index == questionText.length) {
      clearInterval(interval);
      var delay = setTimeout(function() {
        window.location.assign("https://www.google.com/search?q=" + questionText);
      },forwardTime);
    }

  },intervalTime);
}
