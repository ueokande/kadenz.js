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

  for (var i = 0, l1 = Kadenz.pages.length; i < l1; ++i) {
    var page = Kadenz.pages[i];
  }

  Kadenz.Pagenum.addNumber();
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
    var key = Kadenz.keyframes.shift();
    key.start();
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

  var eventNames = ["transitionEnd", "mozTransitionEnd", "webkitTransitionEnd"];
  for (i = 0; i < eventNames.length; ++i) {
    currentPage.element.addEventListener(eventNames[i], function(e) {
      currentPage.neutralStyle();
      currentPage.hide();
      Kadenz.Keyframe.neutralCss();
    }, false );
    nextPage.element.addEventListener(eventNames[i], function(e) {
      nextPage.neutralStyle();
    }, false );
  }
  func(currentPage.element, nextPage.element, duration, property);
};

/* Converts time descrived as string to millisecond
 * timeToMs("200ms")    // return 200
 * timeToMs("5s")       // return 5000
 * timeToMs("1.4s")     // return 1400
 */
Kadenz.timeToMsa = function(time) {
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

