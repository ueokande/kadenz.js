/*
 *  Kadenz.Keyframe class
 */
Kadenz.Keyframe = function (ele) {
  this.element = ele;
}

Kadenz.Keyframe.prototype = {
  target : function () {
    return this.element.getAttribute("target");
  },

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
 */
Kadenz.Page = function (elem) {
  this.element = elem;
  this.defaultCss = elem.cssText;
};

Kadenz.Page.prototype = {
  setPageNum : function (num) {
    for (var i = 0; i < this.element.length; ++i) {
      var ele = page.children[i];
      if (ele.classList.contains('page')) {
        ele.innerHTML = i + 1;
      }
    }
  },

  neutralStyle : function (page) {
    this.element.style.cssText = this.defaultCss;
  },

  show : function (page) {
    this.element.style.visibility = "visible";
  },

  hide : function (page) {
    this.element.style.visibility = "hidden";
  },

  getAttribute : function (name) {
    return this.element.getAttribute(name);
  },

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

