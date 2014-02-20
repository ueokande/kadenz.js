window.onload = function() {
  Kadenz.initPages();
}

window.onkeypress = function(e) {
  if (e.charCode == "[".charCodeAt(0)) {
    Kadenz.skipToPrevPage();
  } else if (e.charCode == "]".charCodeAt(0)) {
    Kadenz.skipToNextPage();
  }
}
window.onkeydown = function(e) {
  if (e.keyCode == 38) {        // Arrow down
    Kadenz.prevStep();
  } else if (e.keyCode == 40) { // Arrow up
    Kadenz.nextStep();
  } else if (e.keyCode == 33) { // Page up
    Kadenz.skipToPrevPage();
  } else if (e.keyCode == 34) { // Page down
    Kadenz.skipToNextPage();
  }
};

window.onclick = function(e) {
  Kadenz.nextStep();
};

window.hashchange = function (e) {
};
