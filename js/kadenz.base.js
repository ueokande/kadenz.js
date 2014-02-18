Kadenz = {
  Plugins : {
    pageEffects : {}
  },

  currentIndex: 0,
  pages: [],
  keyframes: [],
  defaultStyle: "",
  defaultDuration: 1000,
}

/*
 * Kadenz.Controller class
 */
Kadenz.Controller = {
  initPages : function () {
    var pages = document.body.getElementsByTagName("section");
    if (pages.length == 0) {
      return;
    }
    for (i = 0; i < pages.length; ++i) {
      var p = new Kadenz.Page(pages[i]);
      Kadenz.pages.push(p);
    }

    for (var i = 0, l1 = Kadenz.pages.length; i < l1; ++i) {
      var page = Kadenz.pages[i];
      page.setPageNum(i + 1);
    }

    this.skipToPage(0);
  },

  skipToNextPage : function () {
    skipToPage(Kadenz.currentIndex + 1)
  },


  skipToPrevPage : function () {
    skipToPage(Kadenz.currentIndex - 1)
  },

  skipToPage : function (page) {
    var len = Kadenz.pages.length;
    p = Math.min(Math.max(page,0), len - 1);
    for (var i = 0; i < len; ++i) {
      if (i <= p) {
        Kadenz.pages[i].show();
      } else {
        Kadenz.pages[i].hide();
      }
    }
    Kadenz.currentIndex = p;
    Kadenz.keyframes = Kadenz.pages[Kadenz.currentIndex].keyframes();
  },

  nextStep : function () {
    if (Kadenz.keyframes.length == 0) {
      if (Kadenz.currentIndex >= Kadenz.pages.length - 1) {
        return;
      }
      Kadenz.currentIndex++;

      var currentPage = Kadenz.pages[Kadenz.currentIndex - 1];
      var nextPage = Kadenz.pages[Kadenz.currentIndex];
      nextPage.show();
      this.animatePage(currentPage, nextPage);
      Kadenz.keyframes = nextPage.keyframes();
    } else {
      var key = Kadenz.keyframes.shift();
      key.start();
    }
  },

  prevStep : function () {
  },

  animatePage : function (currentPage, nextPage) {
    var effect = nextPage.getAttribute("effect");
    var duration = nextPage.getAttribute("duration");
    var property = nextPage.attributes();
    if (effect == null) {
      return;
    }
    var func = Kadenz.Plugins.pageEffects[effect];
    if (func == null) {
      console.warn("No such page effect of not resitered : " + effect);
      return
    }
    if (duration == null) {
      duration = Kadenz.defaultDuration + "ms";
    }

    var eventNames = ["transitionEnd", "mozTransitionEnd", "webkitTransitionEnd"];
    for (i = 0; i < eventNames.length; ++i) {
      currentPage.element.addEventListener(eventNames[i], function(e) {
        currentPage.neutralStyle();
        currentPage.hide();
      }, false );
      nextPage.element.addEventListener(eventNames[i], function(e) {
        nextPage.neutralStyle();
      }, false );
    }
    func(currentPage.element, nextPage.element, duration, property);
  },

  /* convert time specified by string to millisecond
   * timeToMs("200ms")    // return 200
   * timeToMs("5s")    // return 2000
   * timeToMs("1.4s")    // return 1400
   */
  timeToMsa : function (time) {
    var ms = time.split("ms");
    if (ms.length == 2) {
      return ms[0];
    }
    var s = time.split("s");
    if (s.length == 2) {
      return (s[0] * 1000);
    }
    return 0;
  },
}


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

