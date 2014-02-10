SonicPlugins.pageEffect["dissolve"] = function (currentPage,
                                                nextPage,
                                                duration,
                                                property) {
  nextPage.style.opacity = "0";
  setTimeout(function() {
    nextPage.style.transitionProperty = "opacity";
    nextPage.style.transitionDuration = duration;
    nextPage.style.opacity = "1";
  }, 0);
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
    nextPage.style.transitionProperty = "left, top";
    nextPage.style.transitionDuration = duration;
    nextPage.style.left = "0%"
    nextPage.style.top = "0%"
  }, 0);
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
  }, 0);
}

/*
 * Slide-in Page Effect
 * Optional Arguments
 * * direction ..... Direction of zooming
 *     up
 *     down
 *     in
 *     out
 */
SonicPlugins.pageEffect["scale"] = function (currentPage,
                                            nextPage,
                                            duration,
                                            property) {
  var direction = property.direction;
  var targetNext = true;   // A target of the animation is next slide when true
  var zoomin = true;       // Zooming is zoom-in when true

  if (direction == "up") {
    targetNext = true;
    zoomin = true;
  } else if (direction == "in") {
    targetNext = true;
    zoomin = false;
  } else if (direction == "out") {
    targetNext = false;
    zoomin = true;
  } else if (direction == "down") {
    targetNext = false;
    zoomin = false;
  }

  if (targetNext) {
    currentPage.style.zIndex = "0";
    nextPage.style.zIndex = "1";
    nextPage.style.opacity = "0";
    if (zoomin) {
      nextPage.style.transform = "scale(0.2,0.2)";
      nextPage.style.mozTransform = "scale(0.2,0.2)";
      nextPage.style.webkitTransform = "scale(0.2,0.2)";
    } else {
      nextPage.style.transform = "scale(3.0,3.0)";
      nextPage.style.mozTransform = "scale(3.0,3.0)";
      nextPage.style.webkitTransform = "scale(3.0,3.0)";
    }
  } else { // if current slide will animate
    currentPage.style.zIndex = "1";
    nextPage.style.zIndex = "0";
    currentPage.style.opacity = "1";
    nextPage.style.transform = "scale(1,1)";
    nextPage.style.mozTransform = "scale(1,1)";
    nextPage.style.webkitTransform = "scale(1,1)";
  }
  setTimeout(function() {
    if (targetNext) {
      nextPage.style.transitionProperty = "opacity, transform, -webkit-transform, -moz-transform";
      nextPage.style.transitionDuration = duration;
      nextPage.style.opacity = "1";
      nextPage.style.transform = "scale(1.0,1.0)";
      nextPage.style.mozTransform = "scale(1.0,1.0)";
      nextPage.style.webkitTransform = "scale(1.0,1.0)";
    } else {
      currentPage.style.transitionProperty = "opacity, transform, -webkit-transform, -moz-transform";
      currentPage.style.transitionDuration = duration;
      currentPage.style.opacity = "0";
      if (zoomin) {
        currentPage.style.transform = "scale(3,3)";
        currentPage.style.mozTransform = "scale(3,3)";
        currentPage.style.webkitTransform = "scale(3,3)";
      } else {
        currentPage.style.transform = "scale(0.2,0.2)";
        currentPage.style.mozTransform = "scale(0.2,0.2)";
        currentPage.style.webkitTransform = "scale(0.2,0.2)";
      }
    }
  }, 0);
}
