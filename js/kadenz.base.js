Kadenz = {
  Plugins : {
    pageEffects : {}
  },

  currentIndex: 0,
  pages: [],
  keyframes: [],
  defaultStyle: "",

  defaultDuration: 1000
}


function initPages() {
  var pages = document.body.getElementsByTagName("section");
  if (pages.length == 0) {
    return;
  }
  for (i = 0; i < pages.length; ++i) {
    Kadenz.pages.push(pages[i]);
  }
  Kadenz.defaultStyle = Kadenz.pages[0].style.cssText;

  for (var i = 0, l1 = Kadenz.pages.length; i < l1; ++i) {
    var page = Kadenz.pages[i];
    for (var j = 0, l2 = page.children.length; j < l2; ++j) {
      var ele = page.children[j];
      if (ele.classList.contains('page')) {
        ele.innerHTML = i + 1;
      }
    }
  }

  skipToPage(0);
}

function skipToNextPage() {
  skipToPage(Kadenz.currentIndex + 1)
}

function skipToPrevPage() {
  skipToPage(Kadenz.currentIndex - 1)
}

function skipToPage(page) {
  var len = Kadenz.pages.length;
  p = Math.min(Math.max(page,0), len - 1);
  for (var i = 0; i < len; ++i) {
    if (i <= p) {
      showPage(Kadenz.pages[i]);
    } else {
      hidePage(Kadenz.pages[i]);
    }
  }
  Kadenz.currentIndex = p;
  loadAnimations(Kadenz.pages[Kadenz.currentIndex]);
}

function nextStep() {
  if (Kadenz.keyframes.length == 0) {
    if (Kadenz.currentIndex >= Kadenz.pages.length - 1) {
      return;
    }
    Kadenz.currentIndex++;

    var currentPage = Kadenz.pages[Kadenz.currentIndex - 1];
    var nextPage = Kadenz.pages[Kadenz.currentIndex];
    showPage(nextPage);
    animatePage(currentPage, nextPage);
    loadAnimations(nextPage)
  } else {
    var key = Kadenz.keyframes.shift();
    applyAnimation(key);
  }
}

function prevStep() {
}

function neutralStyle(page) {
  page.style.cssText = Kadenz.defaultStyle;
}

function showPage(page) {
  page.style.visibility = "visible";
}

function hidePage(page) {
  page.style.visibility = "hidden";
}

function animatePage(currentPage, nextPage) {
  var effect = nextPage.getAttribute("effect");
  var duration = nextPage.getAttribute("duration");
  var property = attrsToObj(nextPage.attributes);
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
    currentPage.addEventListener(eventNames[i], function(e) {
      neutralStyle(currentPage);
      hidePage(currentPage);
    }, false );
    nextPage.addEventListener(eventNames[i], function(e) {
      neutralStyle(nextPage);
    }, false );
  }
  func(currentPage, nextPage, duration, property);
}

function attrsToObj(attrs) {
  var obj = {};
  for (i = 0, len = attrs.length; i < len; ++i) {
    var it = attrs.item(i);
    if (it.nodeName != "style" && it.nodeName != "effect" &&
        it.nodeName != "duration") {
      obj[it.nodeName] = it.value;
    }
  }
  return obj;
}

function applyAnimation(frame) {
  var target = document.getElementById(frame.target);
  if (target == null) {
      console.warn("Target '" + frame.target + "' of the animation is not existing.");
      return;
  }
  if (frame.css != null) {
    for (k in frame.css) {
      target.style[k] = frame.css[k];
    }
  }
}

function loadAnimations(page) {
  Kadenz.keyframes = [];
  var animationNode = page.getElementsByTagName("animation")[0];
  if (animationNode == null) {
    return;
  }
  var keyframeNodes = animationNode.getElementsByTagName("keyframe");
  for (i = 0; i < keyframeNodes.length; ++i) {
    var keyNode = keyframeNodes[i];
    var target = keyNode.getAttribute("target");
    var css = keyNode.getAttribute("css");
    if (target == null) {
      console.warn("Target of the animation is not specified.");
      continue;
    }
    if (css == null) {
      console.debug("Property of the animation is not specified.");
      continue;
    }
    Kadenz.keyframes.push({
      "target": target,
      "css"   : cssToObject(css)
    });
  }
}

/* convert time specified by string to millisecond
 * timeToMs("200ms")    // return 200
 * timeToMs("5s")    // return 2000
 * timeToMs("1.4s")    // return 1400
 */
function timeToMs(time) {
  var ms = time.split("ms");
  if (ms.length == 2) {
    return ms[0];
  }
  var s = time.split("s");
  if (s.length == 2) {
    return (s[0] * 1000);
  }
  return 0;
}

function cssToObject(css) {
  var ret = {};
  css = css.replace(/\s/g, '');
  var attrs = css.split(';');
  for (var i = 0; i < attrs.length; ++i) {
    var entry = attrs[i].split(':');
    ret[entry[0]] = entry[1];
  }
  return ret;
}
