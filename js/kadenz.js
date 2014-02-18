window.onload = function() {
  Kadenz.Controller.initPages();

  registerInput();
}

function registerInput() {
  document.onkeydown = function(e) {
    if (e.keyCode == 38) {
      Kadenz.Controller.prevStep();
    } else if (e.keyCode == 40) {
      Kadenz.Controller.nextStep();
    } else if (e.keyCode == 219) {
      Kadenz.Controller.skipToPrevPage();
    } else if (e.keyCode == 221) {
      Kadenz.Controller.skipToNextPage();
    }
  };
  document.onclick = function(e) {
    Kadenz.Controller.nextStep();
  };
}

