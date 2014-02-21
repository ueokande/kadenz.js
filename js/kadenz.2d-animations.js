/*
 * Dissolve page effect
 * Optional arguments
 * - direction ..... Direction of movement
 *     right  ... Left to Right
 *     left   ... Right to Left
 *     up ... Top to Bottom
 *     down ... Bottom to Top
 */
Kadenz.Plugins.pageEffects["dissolve"] = function(currentPage,
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
 * Move-In page Effect
 * Optional arguments
 * - direction ..... Direction of movement
 *     right  ... Left to Right
 *     left   ... Right to Left
 *     up ... Top to Bottom
 *     down ... Bottom to Top
 */
Kadenz.Plugins.pageEffects["move_in"] = function(currentPage,
                                                 nextPage,
                                                 duration,
                                                 property) {
  var before = ({
    left  : ["100%", "0%"],
    right : ["-100%", "0%"],
    up    : ["0%", "100%"],
    down  : ["0%", "-100%"],
  })[property.direction];
  if (before == null) {
    if (property.direction != null) {
      console.warn("Invalid value of direction: " + property.direction);
    }
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
 * Pushing page effect
 * Optional arguments
 * - direction ..... Direction of movement
 *     right   ... Left to Right
 *     left    ... Right to Left
 *     up      ... Top to Bottom
 *     down    ... Bottom to Top
 */
Kadenz.Plugins.pageEffects["push"] = function(currentPage,
                                              nextPage,
                                              duration,
                                              property) {
  var posPrefix = {
    left  : ["0%", "0%", "100%", "0%", "-100%", "0%", "0%", "0%"],
    right : ["0%", "0%", "-100%", "0%", "100%", "0%", "0%", "0%"],
    up    : ["0%", "0%", "0%", "100%", "0%", "-100%", "0%", "0%"],
    down  : ["0%", "0%", "0%", "-100%", "0%", "100%", "0%", "0%"],
  };
  var pos = posPrefix[property.direction];
  if (pos == null) {
    if (property.direction != null) {
      console.warn("Invalid value of direction: " + property.direction);
    }
    pos = posPrefix["left"];
  }
  currentPage.style.left = pos[0];
  currentPage.style.top= pos[1];
  nextPage.style.left = pos[2];
  nextPage.style.top= pos[3];
  setTimeout(function() {
    currentPage.style.transitionProperty = "left, top";
    currentPage.style.transitionDuration = duration;
    currentPage.style.left = pos[4];
    currentPage.style.top = pos[5];
    nextPage.style.transitionProperty = "left, top";
    nextPage.style.transitionDuration = duration;
    nextPage.style.left = pos[6];
    nextPage.style.top = pos[7];
  }, 0);
}

/*
 * Slide-in Page Effect
 * Optional arguments
 * - direction ..... Direction of zooming
 *     up
 *     down
 *     in
 *     out
 */
Kadenz.Plugins.pageEffects["scale"] = function(currentPage,
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
  } else if (direction != null) {
    console.warn("Invalid value of direction: " + direction);
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

