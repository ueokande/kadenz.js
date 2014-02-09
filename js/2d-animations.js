SonicPlugins.pageEffect["dissolve"] = function (currentPage,
                                                nextPage,
                                                duration,
                                                property) {
  nextPage.style.opacity = "0";
  setTimeout(function() {
    nextPage.style.transitionProperty = "opacity";
    nextPage.style.transitionDuration = duration;
    nextPage.style.opacity = "1";
  }, 1);
}

/*
 * Move-In Page Effect
 * Optional Arguments
 * * direction ..... Direction of movement
 *     to_right  ... Left to Right
 *     to_left   ... Right to Left
 *     to_bottom ... Top to Bottom
 *     to_top    ... Bottom to Top
 */
SonicPlugins.pageEffect["move_in"] = function (currentPage,
                                               nextPage,
                                               duration,
                                               property) {
  console.debug(property);
  var before = ({
    // left top
    to_right : ["-100%", "0%"],
    to_left : ["100%", "0%"],
    to_bottom : ["0%", "-100%"],
    to_top : ["0%", "100%"],
  })[property.direction];
  if (before == null) {
    before = ["100%", "0%"];
  }
  nextPage.style.left = before[0];
  nextPage.style.top = before[1];
  setTimeout(function() {
    nextPage.style.transitionProperty = "left top";
    nextPage.style.transitionDuration = duration;
    nextPage.style.left = "0%"
    nextPage.style.top = "0%"
  }, 1);
}

/*
 * Slide-in Page Effect
 */
SonicPlugins.pageEffect["slide_in"] = function (currentPage,
                                                nextPage,
                                                duration,
                                                property) {
  currentPage.style.left = "0%"
  nextPage.style.left = "100%"
  setTimeout(function() {
    currentPage.style.transitionProperty = "left";
    currentPage.style.transitionDuration = duration;
    currentPage.style.left = "-100%"
    nextPage.style.transitionProperty = "left";
    nextPage.style.transitionDuration = duration;
    nextPage.style.left = "0%"
  }, 1);
}

/*
 * Slide-in Page Effect
 * Optional Arguments
 * * direction ..... Direction of zooming
 *     1 ... 
 *     2 ... 
 *     3 ... 
 *     4 ... 
 */
SonicPlugins.pageEffect["zoom"] = function (currentPage,
                                            nextPage,
                                            duration,
                                            property) {
  var direction = property.direction;
  var targetNext = true;   // A target of the animation is next slide when true
  var zoomin = true;       // Zooming is zoom-in when true

  if (direction == "1") {
    targetNext = true;
    zoomin = true;
  } else if (direction == "2") {
    targetNext = true;
    zoomin = false;
  } else if (direction == "3") {
    targetNext = false;
    zoomin = true;
  } else if (direction == "4") {
    targetNext = false;
    zoomin = false;
  }

  if (targetNext) {
    currentPage.style.zIndex = "0";
    nextPage.style.zIndex = "1";
    nextPage.style.opacity = "0";
    if (zoomin) {
      nextPage.style.webkitTransform = "scale(0.2,0.2)";
    } else {
      nextPage.style.webkitTransform = "scale(3,3)";
    }
  } else { // if current slide will animate
    currentPage.style.zIndex = "1";
    nextPage.style.zIndex = "0";
    currentPage.style.opacity = "1";
    nextPage.style.webkitTransform = "scale(1,1)";
  }
  setTimeout(function() {
    if (targetNext) {
      nextPage.style.transitionProperty = "opacity -webkit-transform transform";
      nextPage.style.transitionDuration = duration;
      nextPage.style.opacity = "1";
      nextPage.style.webkitTransform = "scale(1.0,1.0)";
    } else {
      currentPage.style.transitionProperty = "opacity -webkit-transform transform";
      currentPage.style.transitionDuration = duration;
      currentPage.style.opacity = "0";
      if (zoomin) {
        currentPage.style.webkitTransform = "scale(3,3)";
      } else {
        currentPage.style.webkitTransform = "scale(0.2,0.2)";
      }
    }
  }, 1);
}
