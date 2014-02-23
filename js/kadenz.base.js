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
Kadenz.Keyframe = function(ele) {
  this.element = ele;
}

Kadenz.Keyframe.prototype = {
  /*
   * Returns the target of the keyframe.
   */
  target : function() {
    return this.element.getAttribute("target");
  },

  /*
   * Returns the duration of the animation as text.  Return null If the
   * duration is note speficied.
   */
  duration : function() {
    return this.element.getAttribute("duration");
  },

  properties : function() {
    var obj = {};
    var attrs = this.element.attributes;
    for (i = 0, len = attrs.length; i < len; ++i) {
      var it = attrs.item(i);
      if (it.nodeName != "target" && it.nodeName != "duration") {
        obj[it.nodeName] = it.value;
      }
    }
    return obj;
  },

  /*
   * Apply properties to the target
   */
  start : function() {
    var targetEle = document.getElementById(this.target());
    if (targetEle == null) {
        console.warn("The animation target '" + this.target() + "' is not existing.");
        return;
    }
    Kadenz.Keyframe.addCss(targetEle);
    var duration = this.duration();
    if (duration != null) {
      targetEle.style.transitionDuration = duration;
    }
    var properties = this.properties();
    for (k in properties) {
      var v = properties[k];
      if (targetEle.style.transitionProperty.length == 0) {
        targetEle.style.transitionProperty = v
      } else {
        targetEle.style.transitionProperty = targetEle.style.transitionProperty + "," + v;
      }
      targetEle.style[k] = v;
    }
  }
}


Kadenz.Keyframe.cssCache = {};

Kadenz.Keyframe.addCss= function(ele) {
    if (!(ele.id in Kadenz.Keyframe.cssCache)) {
      Kadenz.Keyframe.cssCache[ele.id] = ele.style.cssText;
    }
}

Kadenz.Keyframe.neutralCss = function() {
  for (k in this.cssCache) {
    var ele = document.getElementById(k);
    ele.style.cssText = this.cssCache[k];
    delete this.cssCache[k];
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
Kadenz.Page = function(elem) {
  this.element = elem;
  this.defaultCss = elem.cssText;
};

Kadenz.Page.prototype = {
  /*
   * Resets the css of the element
   */
  neutralStyle : function(page) {
    this.element.style.cssText = this.defaultCss;
  },

  /*
   * Sets the `visibility` style as `visible`.
   */
  show : function(page) {
    this.element.style.visibility = "visible";
  },

  /*
   * Sets the `visibility` style as `hidden`.
   */
  hide : function(page) {
    this.element.style.visibility = "hidden";
  },

  /*
   * Returns the value of the attribute specified `name`.
   */
  getAttribute : function(name) {
    return this.element.getAttribute(name);
  },

  /*
   * Returns all attributes.
   */
  attributes : function() {
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
  keyframes : function() {
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

