window.onload = function() {
  initPages();

  registerInput();
}

function registerInput() {
  document.onkeydown = function(e) {
    if (e.keyCode == 38) {
      prevStep();
    } else if (e.keyCode == 40) {
      nextStep();
    } else if (e.keyCode == 219) {
      skipToPrevPage();
    } else if (e.keyCode == 221) {
      skipToNextPage();
    }
  };
  document.onclick = function(e) {
    nextStep();
  };
}

