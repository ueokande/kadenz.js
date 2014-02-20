Kadenz = {
  Plugins : {
    pageEffects : {}
  },

  currentIndex: 0,
  pages: [],
  keyframes: [],
  defaultDuration: 1000
};

/*
 * Kadenz interface methods
 */
Kadenz.initPages = function () {
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
};

Kadenz.skipToNextPage = function () {
  this.skipToPage(Kadenz.currentIndex + 1)
};

Kadenz.skipToPrevPage = function () {
  this.skipToPage(Kadenz.currentIndex - 1)
};

Kadenz.skipToPage = function (page) {
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
};

Kadenz.nextStep = function () {
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
};

Kadenz.prevStep = function () {
};

Kadenz.animatePage = function (currentPage, nextPage) {
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
};

/* convert time specified by string to millisecond
 * timeToMs("200ms")    // return 200
 * timeToMs("5s")    // return 2000
 * timeToMs("1.4s")    // return 1400
 */
Kadenz.timeToMsa = function (time) {
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

