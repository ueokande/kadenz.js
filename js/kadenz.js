Kadenz = {
  Plugins : {
    pageEffects : {}
  },

  currentIndex: -1,
  pages: [],
  keyframes: [],
  defaultDuration: 1000
};

/*
 * Initializes the internal variables and HTML contents.
 */
Kadenz.initPages = function() {
  var pages = document.body.getElementsByTagName("section");
  if (pages.length == 0) {
    return;
  }
  for (i = 0; i < pages.length; ++i) {
    var p = new Kadenz.Page(pages[i]);
    Kadenz.pages.push(p);
  }

  // TODO: Divide to call a member method of window, and core implementation
  var hash = window.location.hash.split("#");
  var num = Math.max(0, (~~hash[1]) - 1);
  this.skipToPage(num);
};

/*
 * Skips to next page without animation.
 */
Kadenz.skipToNextPage = function() {
  this.skipToPage(Kadenz.currentIndex + 1)
};

/*
 * Skips to previous page without animation.
 */
Kadenz.skipToPrevPage = function() {
  this.skipToPage(Kadenz.currentIndex - 1)
};

/*
 * Skips to specified page without animation.  Updates a hash in URL if
 * updateHash is true or omitted.  Note that you must NOT call this function
 * with updateHash with true because it might be inifinite loop.
 */
Kadenz.skipToPage = function(page, updateHash) {
  if (page == Kadenz.currentIndex) {
    return;
  }
  if (updateHash == null) {
    updateHash = true;
  }
  Kadenz.Keyframe.neutralCss();
  var len = Kadenz.pages.length;
  p = Math.min(Math.max(page,0), len - 1);
  for (var i = 0; i < len; ++i) {
    if (i == p) {
      Kadenz.pages[i].show();
    } else {
      Kadenz.pages[i].hide();
    }
  }
  Kadenz.currentIndex = p;
  Kadenz.keyframes = Kadenz.pages[Kadenz.currentIndex].keyframes();
  if (updateHash) {
    location.hash = "#" + (Kadenz.currentIndex + 1);
  }
};

/*
 * Animate the element of page to next.
 */
Kadenz.nextStep = function() {
  if (Kadenz.keyframes.length == 0) {
    if (Kadenz.currentIndex >= Kadenz.pages.length - 1) {
      return;
    }
    Kadenz.currentIndex++;
    location.hash = "#" + (Kadenz.currentIndex + 1);

    var currentPage = Kadenz.pages[Kadenz.currentIndex - 1];
    var nextPage = Kadenz.pages[Kadenz.currentIndex];
    nextPage.show();
    this.animatePage(currentPage, nextPage);
    Kadenz.keyframes = nextPage.keyframes();
  } else {
    var keys = [];
    keys.push(Kadenz.keyframes.shift());
    while (Kadenz.keyframes.length != 0 &&
           Kadenz.keyframes[0].timing() == Kadenz.Keyframe.TIMING_WITH) {
      keys.push(Kadenz.keyframes.shift());
    }
    while (keys.length != 0) {
      keys.shift().start();
    }
  }
};

/*
 * Skip to previous step of page.
 */
Kadenz.prevStep = function() {
  this.skipToPrevPage();
};

/*
 * Animates the pages from `currentPage` to `nextPage`.
 */
Kadenz.animatePage = function(currentPage, nextPage) {
  var effect = nextPage.getAttribute("effect");
  var duration = nextPage.getAttribute("duration");
  var property = nextPage.attributes();
  if (effect == null) {
    currentPage.hide();
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

  setTimeout(function() {
      currentPage.neutralStyle();
      currentPage.hide();
      nextPage.neutralStyle();
  }, this.timeToMs(duration))
  func(currentPage.element, nextPage.element, duration, property);
};

/* Converts time descrived as string to millisecond
 * timeToMs("200ms")    // return 200
 * timeToMs("5s")       // return 5000
 * timeToMs("1.4s")     // return 1400
 */
Kadenz.timeToMs = function(time) {
  var ms = time.split("ms");
  if (ms.length == 2) {
    return ms[0];
  }
  var s = time.split("s");
  if (s.length == 2) {
    return (s[0] * 1000);
  }
  return 0;
};


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

/*
 */
Kadenz.Keyframe.TIMING_CLICK = 0;
Kadenz.Keyframe.TIMING_WITH  = 1,
Kadenz.Keyframe.TIMING_AFTER = 2,

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

  /*
   */
  timing : function() {
    timing_string = this.element.getAttribute("timing");
    if (timing_string == null || timing_string == "click") {
      return Kadenz.Keyframe.TIMING_CLICK;
    } else if (timing_string == "after") {
      return Kadenz.Keyframe.TIMING_AFTER;
    } else if (timing_string == "with") {
      return Kadenz.Keyframe.TIMING_WITH;
    } else {
      console.warn("The animation timing '" + timing_string + "' is invalid.");
      return Kadenz.Keyframe.TIMING_CLICK;
    }
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

/*
 * The cache which stores default css of the element
 */
Kadenz.Keyframe.cssCache = {};

/*
 * Adds the current css of the element to cache.
 */
Kadenz.Keyframe.addCss= function(ele) {
    if (!(ele.id in Kadenz.Keyframe.cssCache)) {
      Kadenz.Keyframe.cssCache[ele.id] = ele.style.cssText;
    }
}

/*
 * Reset the css of the element from the cache, and resets the cache.
 */
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

