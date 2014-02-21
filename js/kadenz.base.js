/*
 *  Kadenz.Keyframe class
 *
 *  The Kadenz.Keyframe class provides the keyframe of the animation.
 *  The animation mechanism is very simple, the style (css) of the element in
 *  HTML will be overwritten when the keyframe is fired.  To use it, create a
 *  Kadenz.Keyframe from the HTML element object which described as <keyframe>
 *  tag in HTML.  The <keyframe> tag is distinctive specification in Kadenz.js.
 *  The keyframe will be fired with start() method.
 */

/*
 *  Constructs a Keyframe object with the given element which is a element
 *  contained in <keyframe>.
 */
Kadenz.Keyframe = function (ele) {
  this.element = ele;
}

Kadenz.Keyframe.prototype = {
  /*
   * Returns the target of the keyframe
   */
  target : function () {
    return this.element.getAttribute("target");
  },

  /*
   * Return the css property to apply to the target
   */
  css : function () {
    cssText = this.element.getAttribute("css");
    var ret = {};
    cssText = cssText.replace(/\s/g, '');
    var attrs = cssText.split(';');
    for (var i = 0; i < attrs.length; ++i) {
      var entry = attrs[i].split(':');
      ret[entry[0]] = entry[1];
    }
    return ret;
  },

  /*
   * Apply properties to the target
   */
  start : function () {
    var targetEle = document.getElementById(this.target());
    if (targetEle == null) {
        console.warn("The animation target '" + targetEle + "' is not existing.");
        return;
    }
    var css = this.css();
    if (css != null) {
      for (k in css) {
        targetEle.style[k] = css[k];
      }
    }
  }
}


/*
 *  Kadenz.Page class
 *
 *  The Page class provides the page of the slides.  The Page object is created
 *  from <section> node in HTML.  The css of the page is modified with show(),
 *  hide(), and neutralStyle() methods.
 */

/*
 * Constructs a Page object with the given <section> element.
 */
Kadenz.Page = function (elem) {
  this.element = elem;
  this.defaultCss = elem.cssText;
};

Kadenz.Page.prototype = {
  /*
   * Sets the page number of the slide.
   * The actual behavior is adding the number into internalHTML in the element
   * which is set an attribute `class` as `page`.
   */
  setPageNum : function (num) {
    for (var i = 0; i < this.element.length; ++i) {
      var ele = page.children[i];
      if (ele.classList.contains('page')) {
        ele.innerHTML = i + 1;
      }
    }
  },

  /*
   * Resets the css of the element
   */
  neutralStyle : function (page) {
    this.element.style.cssText = this.defaultCss;
  },

  /*
   * Sets the `visibility` style as `visible`.
   */
  show : function (page) {
    this.element.style.visibility = "visible";
  },

  /*
   * Sets the `visibility` style as `hidden`.
   */
  hide : function (page) {
    this.element.style.visibility = "hidden";
  },

  /*
   * Returns the value of the attribute specified `name`.
   */
  getAttribute : function (name) {
    return this.element.getAttribute(name);
  },

  /*
   * Returns all attributes.
   */
  attributes : function () {
    var obj = {};
    var attrs = this.element.attributes;
    for (i = 0, len = attrs.length; i < len; ++i) {
      var it = attrs.item(i);
      if (it.nodeName != "style" && it.nodeName != "effect" &&
          it.nodeName != "duration") {
        obj[it.nodeName] = it.value;
      }
    }
    return obj;
  },

  /*
   * Returns all keyframes contained in <animation> node as Keyframe object.
   */
  keyframes : function () {
    var animationNode = this.element.getElementsByTagName("animation")[0];
    if (animationNode == null) {
      return [];
    }
    var keyframeNodes = animationNode.getElementsByTagName("keyframe");
    var array = [];
    for (i = 0; i < keyframeNodes.length; ++i) {
      var keyframe = new Kadenz.Keyframe(keyframeNodes[i]);
      array.push(keyframe);
    }
    return array;
  }
};

