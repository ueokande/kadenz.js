window.addEventListener("load", function(e){
  Kadenz.initPages();
});

window.addEventListener("keypress", function(e){
  if (e.charCode == "[".charCodeAt(0)) {
    Kadenz.skipToPrevPage();
  } else if (e.charCode == "]".charCodeAt(0)) {
    Kadenz.skipToNextPage();
  }
});

window.addEventListener("keydown", function(e){
  // TODO: Added Enter key but the Enter is conflicted to kadenz.pager.
  switch (e.keyCode) {
  // case 13:    // Enter
  case 32:    // Space
  case 40:    // Arrow Down
  case 34:    // Page Down
    Kadenz.nextStep();
    break;
  case 38:    // Arrow Up
  case 33:    // Page Up
    Kadenz.prevStep();
    break;
  case 36:    // Home
    Kadenz.skipToPage(0);
    break;
  case 35:    // End
    Kadenz.skipToPage(Kadenz.pages.length - 1);
    break;
  }
});

window.addEventListener("click", function(e){
  Kadenz.nextStep();
});

window.addEventListener("hashchange", function(e){
  var hash = e.newURL.split("#");
  var num = Math.max(0, (~~hash[1]) - 1);
  if (num == -1) {
    return;
  }
  Kadenz.skipToPage(num, false);
});
