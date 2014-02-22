/*
 * Kadenz.Pager module
 *
 * The Kadenz.Pager module provides the pager of slides to search and jump to
 * page.  When the presenter press number key, the pager will be shown the
 * top of display. The slides are arranged likes list view, and presentation
 * will show slide with specified with inputted number or clicked page.
 *
 * The list of the slide view is not implemented yet, so to jump to objective
 * page, use text box.
 *
 * TODO : Implement slides list in pager
 */
Kadenz.Pager = {
  inputBox : null,
  shown : false
};

/*
 * Add elements of the pager into body.
 */
Kadenz.Pager.initPager = function () {
  var input = document.createElement("input");
  input.type = "text";
  input.style.fontSize        = "16px";
  input.style.textAlign       = "center";
  input.style.width           = "48px"
  input.style.height          = "24px"
  input.style.backgroundColor = "#000"
  input.style.color           = "#fff"
  input.onkeydown = this.inputKeyEvent;

  elem = document.createElement("div");
  elem.style.position           = "absolute";
  elem.style.backgroundColor    = "#222";
  elem.style.boxShadow          = "0px 0px 12px #333"
  elem.style.padding            = "16px";
  elem.style.paddingTop         = "28px";
  elem.style.left               = "50%";
  elem.style.borderRadius       = "12px";
  elem.style.marginLeft         = "-40px";
  elem.style.transitionTarget   = "top";
  elem.style.transitionDuration = "300ms";
  elem.insertBefore(input, null);

  Kadenz.Pager.inputBox = input;
  document.body.insertBefore(elem);

  this.hidePager();
};

/*
 * Shows the pager.
 */
Kadenz.Pager.showPager = function() {
  Kadenz.Pager.inputBox.value = "";
  elem.style.top = "-12px";
  this.shown = true;
};

/*
 * Hides the pager.
 */
Kadenz.Pager.hidePager = function () {
  elem.style.top = "-84px";
  this.shown = false;
};

/*
 * The event method called on keypress on the text box.
 * Jumps to specified in text box when Enter key is pressed.
 */
Kadenz.Pager.inputKeyEvent = function (e) {
  if (e.keyCode != 13) {
    return;
  }
  var num = ~~(Kadenz.Pager.inputBox.value);
  Kadenz.skipToPage(num - 1);
  Kadenz.Pager.hidePager();
};

/*
 * Register callback of load event.
 */
window.addEventListener("load", function(e){
  Kadenz.Pager.initPager();
});

/*
 * Register callback of keypress event.
 */
window.addEventListener("keypress", function(e){
  if (Kadenz.Pager.shown) {
    return;
  }
  if ("0".charCodeAt(0) <= e.charCode && e.charCode <= "9".charCodeAt(0)) {
    var chr = String.fromCharCode(e.charCode);
    Kadenz.Pager.inputBox.focus();
    Kadenz.Pager.showPager();
  }
});
