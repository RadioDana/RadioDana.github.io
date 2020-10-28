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
  for (let iframe of document.querySelectorAll('iframe')) {
	// let realSrc = iframe.name;
	// if (!realSrc) continue;

	if (isVisible(iframe)) {
		iframe.contentwindow.location.reload();
	  // disable caching
	  // this line should be removed in production code
	  //realSrc += '?nocache=' + Math.random();

	  // iframe.src = realSrc;

	  // iframe.name = '';
	}
  }

}

window.onload = function() {
    // if(!window.location.hash) {
        // window.location = window.location + '#loaded';
        // window.location.reload();
    // }
	for (let iframe of document.querySelectorAll('iframe')) {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			iframe.document.execCommand('Stop');
		}
		else {
			iframe.contentwindow.location.stop();
			
		}
	}
}

window.addEventListener('scroll', showVisible);
showVisible();