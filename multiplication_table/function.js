var counter = 0;
var numbers = [];

function reset() {
  for (index = 2;index <= 4;index++) {
    var display = document.getElementById('number' + index);
    display.innerHTML = '?';
  }

  var message = document.getElementsByClassName('message')[0];
  message.innerHTML = 'loading ...';
  message.style.color = 'black';

  return ;
}

function result(message, color) {
  var display = document.getElementsByClassName('message')[0];
  display.innerHTML = message;
  display.style.color = color;

  return ;
}

function count(number) {
  counter = counter % 4 + 1;
  var display = document.getElementById('number' + counter);
  display.innerHTML = number;
  numbers.push(number);

  if (counter == 1)
    reset();

  if (counter == 4) {
    var first = numbers[0] * numbers[1];
    var second = numbers[2] * 10 + numbers[3];

    if (first == second)
      result("Correct!", "yellow");
    else
      result("Fail", "red");

    numbers = [];
  }
}

window.onload = function() {
  document.addEventListener("keydown", keyDown, false);

  function keyDown(key) {
    var keyCode = key.keyCode;
    switch (keyCode) {
      case 48:
      case 96:
        count(0);
        break;
      case 49:
      case 97:
        count(1);
        break;
      case 50:
      case 98:
        count(2);
        break;
      case 51:
      case 99:
        count(3);
        break;
      case 52:
      case 100:
        count(4);
        break;
      case 53:
      case 101:
        count(5);
        break;
      case 54:
      case 102:
        count(6);
        break;
      case 55:
      case 103:
        count(7);
        break;
      case 56:
      case 104:
        count(8);
        break;
      case 57:
      case 105:
        count(9);
        break;
    }
  }
}
