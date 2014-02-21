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
  if (e.keyCode == 38) {        // Arrow up
    Kadenz.prevStep();
  } else if (e.keyCode == 40) { // Arrow down
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

window.onhashchange = function(e) {
  var hash = e.newURL.split("#");
  var num = Math.max(0, (~~hash[1]) - 1);
  if (num == -1) {
    return;
  }
  Kadenz.skipToPage(num);
}
