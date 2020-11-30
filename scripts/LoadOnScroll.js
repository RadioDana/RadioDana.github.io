/**
 * Tests if the element is visible (within the visible part of the page)
 * It's enough that the top or bottom edge of the element are visible
 */
function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // top elem edge is visible OR bottom elem edge is visible
  let topVisible = coords.top > 0 && coords.top < windowHeight;
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

/**
A variant of the test that considers the element visible if it's no more than
one page after/behind the current screen.

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  let extendedTop = -windowHeight;
  let extendedBottom = 2 * windowHeight;

  // top visible || bottom visible
  let topVisible = coords.top > extendedTop && coords.top < extendedBottom;
  let bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

  return topVisible || bottomVisible;
}
*/

function showVisible() {
	scrolling();
	
	if (scrollTimer != -1)
		clearTimeout(scrollTimer);

	scrollTimer = window.setTimeout("scrollFinished()", 500);
		
	for (let iframe of document.querySelectorAll('iframe')) {
		let src = iframe.title;
		if (!src) continue;

		if (isVisible(iframe)) {
		  // disable caching
		  // this line should be removed in production code
		  //realSrc += '?nocache=' + Math.random();

		  iframe.src = src;
		  iframe.title = '';
		}
	}

}

var scrollTimer = -1;
var header = document.getElementById("header");
var footer = document.getElementById("footer");

function scrolling() {
    header.classList.add("scroll");
	footer.classList.add("scroll");
}

function scrollFinished() {
    header.classList.remove("scroll");
	footer.classList.remove("scroll");
}

window.addEventListener('scroll', showVisible);
showVisible();