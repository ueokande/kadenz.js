var defaultDuration = 2000;
var defaultStyle = "";

var Sonic = {
  currentIndex: 0,
  pages: []
};

function initPages() {
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

  for (var i = 0, l1 = Sonic.pages.length; i < l1; ++i) {
    var page = Sonic.pages[i];
    for (var j = 0, l2 = page.children.length; j < l2; ++j) {
      var ele = page.children[j];
      if (ele.classList.contains('page')) {
        ele.innerHTML = i + 1;
      }
    }
  }

  skipToPage(0);
}

function neutralStyle(page) {
  page.style.cssText = defaultStyle;
}

function showPage(page) {
  page.style.visibility = "visible";
}

function hidePage(page) {
  page.style.visibility = "hidden";
}

function skipToNextPage() {
  skipToPage(Sonic.currentIndex + 1)
}

function skipToPrevPage() {
  skipToPage(Sonic.currentIndex - 1)
}

function skipToPage(page) {
  var len = Sonic.pages.length;
  p = Math.min(Math.max(page,0), len - 1);
  for (var i = 0; i < len; ++i) {
    if (i <= p) {
      showPage(Sonic.pages[i]);
    } else {
      hidePage(Sonic.pages[i]);
    }
  }
  Sonic.currentIndex = p;
}

function animatePage(currentPage, nextPage) {
  var effect = nextPage.getAttribute("effect");
  var duration = nextPage.getAttribute("duration");
  var property = attrsToObj(nextPage.attributes);
  if (effect == null) {
    return;
  }
  var func = SonicPlugins.pageEffect[effect];
  if (func == null) {
    console.warn("No such page effect of not resitered : " + effect);
    return
  }
  if (duration == null) {
    duration = "1000ms";
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

function nextStep() {
  if (Sonic.currentIndex >= Sonic.pages.length - 1) {
    return;
  }
  Sonic.currentIndex++;

  var currentPage = Sonic.pages[Sonic.currentIndex - 1];
  var nextPage = Sonic.pages[Sonic.currentIndex];
  showPage(nextPage);
  animatePage(currentPage, nextPage);
}

function prevStep() {
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
