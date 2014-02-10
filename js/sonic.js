window.onload = function() {
  var len = document.body.children.length;
  for (i = 0; i < len; ++i) {
    var ele = document.body.children[i];
    if (ele.tagName == "SECTION" || ele.tagName == "section") {
         Sonic.pages.push(ele);
     } else {
         console.warn(ele.tagName);
     }
  }
  defaultStyle = ele.style.cssText;
  testele = ele;

  registerInput();

  skipToPage(0);
  scrollTo(0,0);
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

