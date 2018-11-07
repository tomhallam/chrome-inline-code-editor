/* eslint-disable no-alert */
let clickedElement = null;

function findWrapperElement(element) {
  if (!element) return false;

  const wrapperElement = element.closest('pre, code, div.terminal');
  return wrapperElement || false;
}

function attachEvents() {
  document.addEventListener('mousedown', (event) => {
    if (
      event.button === 0
      && findWrapperElement(event.target) !== findWrapperElement(clickedElement)
    ) {
      findWrapperElement(clickedElement).contentEditable = false;
      return;
    }

    if (event.button === 2) {
      clickedElement = event.target;
    }
  });

  chrome.extension.onMessage.addListener((msg) => {
    if (msg.action === 'queryContextElement') {
      if (clickedElement === null) {
        alert('Please select a code block to edit');
        return;
      }

      const wrapperElement = findWrapperElement(clickedElement);
      if (!wrapperElement) {
        alert("Sorry, couldn't find a code snippet to edit");
        return;
      }

      wrapperElement.contentEditable = true;
      wrapperElement.focus();
    }
  });
}

chrome.extension.sendMessage({}, () => {
  const readyStateCheckInterval = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);
      attachEvents();
    }
  }, 10);
});
