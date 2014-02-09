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
 * Arguments :
 *    * direction =
 *        to_r   -- Left to Right
 *        to_l   -- Right to Left
 *        to_b   -- Top to Bottom
 *        to_t   -- Bottom to Top
 *        to_br  -- Top Left to Bottom Right
 *        to_bl  -- Top Right to Bottom Left
 *        to_tr  -- Bottom Left to Top Right
 *        to_tl  -- Bottom Right to Top Left
 */
SonicPlugins.pageEffect["move_in"] = function (currentPage,
                                               nextPage,
                                               duration,
                                               property) {
  var direction = property.direction;
  if (direction == "to_r") {
  }
  if (property.direction
  switch (property.direction) {
    case "
    switch
    break;
  }
  nextPage.style.left = "100%"
  setTimeout(function() {
    nextPage.style.transitionProperty = "left";
    nextPage.style.transitionDuration = duration;
    nextPage.style.left = "0%"
  }, 1);
}

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

SonicPlugins.pageEffect["test2d"] = function (currentPage,
                                              nextPage,
                                              duration,
                                              property) {
  nextPage.style.opacity = "0";
  nextPage.style.webkitTransform = "scale(0.2,0.2)";
  setTimeout(function() {
    nextPage.style.transitionProperty = "opacity -webkit-transform transform";
    nextPage.style.transitionDuration = duration;
    nextPage.style.opacity = "1";
    nextPage.style.webkitTransform = "scale(1.0,1.0)";
  }, 1);
}
