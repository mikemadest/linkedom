const assert = require('../assert.js').for('DocumentType');

const {parseHTML} = global[Symbol.for('linkedom')];

const {document} = parseHTML('<!doctype html><html />');

const {documentElement} = document;

assert(documentElement.shadowRoot, null, 'no shadowRoot');

const shadowRoot = documentElement.attachShadow({mode: 'open'});

assert(documentElement.shadowRoot, shadowRoot, 'yes shadowRoot');

try {
  documentElement.attachShadow({mode: 'open'});
  assert(true, false, 'double shadowRoot should not be possible');
} catch (ok) {}

(function() {
  const {document} = parseHTML(`<html><head /><body><div class="js-parent"><div class="js-child"></div></div><div class="js-shadowHost"></div></body></html>`);

  const parent = document.querySelector('.js-parent');
  const child = document.querySelector('.js-child');
  const shadowHost = document.querySelector('.js-shadowHost');

  // create a ShadowRoot
  const shadowRoot = shadowHost.attachShadow({mode:'open'});
  shadowRoot.innerHTML = '<div class="js-shadowChild">content</div>';
  const shadowChild = shadowRoot.querySelector('.js-shadowChild');


  const window = document.defaultView;
  let {MutationObserver} = window;
  let observer = new MutationObserver(() => {});
  observer.observe(parent, {
    childList: true,
    subtree: true,
  });

  assert(parent.getRootNode().nodeName, '#document', 'parent rootNode should be #document');
  assert(child.getRootNode().nodeName, '#document', 'child rootNode should be #document');

  assert(Boolean(shadowChild), true, 'shadowChild should be defined');
  assert(parent.innerHTML, '<div class="js-child"></div>', 'parent should have proper innerHTML');
  assert(shadowRoot.innerHTML, '<div class="js-shadowChild">content</div>', 'shadowRoot should have proper innerHTML');
  assert(shadowChild.innerHTML, 'content', 'shadowChild should have proper innerHTML');

  assert(shadowChild.getRootNode(), shadowRoot, 'shadowChild rootNode should be shadowRoot with composed false');
  assert(shadowChild.getRootNode({composed: true}).nodeName, '#document', 'shadowChild rootNode should be #document with composed true');

  let p = shadowChild.appendChild(document.createElement('p'));
  p.textContent = 'extra entry';

  let span = shadowChild.insertBefore(document.createElement('span'), p);
  span.textContent = 'presentation';
  assert(shadowChild.innerHTML, 'content<span>presentation</span><p>extra entry</p>', 'shadowChild should have proper innerHTML');

  shadowChild.innerHTML = '<div><p>new content</p></div>';
  assert(shadowChild.innerHTML, '<div><p>new content</p></div>', 'shadowChild should have proper innerHTML');

})();
