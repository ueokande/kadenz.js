
var Sonic = {
  currentPage: 0,
  pages: {}
};

$(function() {
  Sonic.pages = $("body").children("section");
  Sonic.pages.css("visibility", "hidden");

  jumpToPage(0);
  scrollTo(0,0);
});

function nextPage() {
  jumpToPage(Sonic.currentPage + 1)
}

function prevPage() {
  jumpToPage(Sonic.currentPage - 1)
}

function jumpToPage(page) {
  p = Math.min(Math.max(page,0), Sonic.pages.length-1);
  $(Sonic.pages[p]).css("visibility", "visible");
  Sonic.currentPage = p;
}

function nextStep() {
}

function prevStep() {
}

