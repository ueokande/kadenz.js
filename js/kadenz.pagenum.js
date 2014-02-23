/*  
 * Sets the page number of the slide.  The actual behavior is adding the number
 * into internalHTML in the element which is set an attribute `class` as
 * `pagenum` or specified name.
 */

Kadenz.Pagenum = {};
Kadenz.Pagenum.addNumber = function(name) {
  if (name == null) {
    name = "pagenum";
  }
  for (var i = 0, len1 = Kadenz.pages.length; i < len1; ++i) {
    for (var j = 0, len2 = Kadenz.pages[i].element.children.length; j < len2; ++j) {
      var ele = Kadenz.pages[i].element.children[j];
      if (ele.classList.contains(name)) {
        ele.innerHTML = i + 1;
      }
    }   
  }
}

