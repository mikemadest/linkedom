'use strict';
const {DOCUMENT_FRAGMENT_NODE} = require('../shared/constants.js');
const {NonElementParentNode} = require('../mixin/non-element-parent-node.js');
const {parseFromString} = require('../shared/parse-from-string.js');

const {
  ignoreCase
} = require('../shared/utils.js');

const {
  CUSTOM_ELEMENTS
} = require('../shared/symbols.js');

/**
 * @implements globalThis.ShadowRoot
 */
class ShadowRoot extends NonElementParentNode {
  constructor(ownerDocument, privateData = {}) {
    super(ownerDocument, '#shadow-root', DOCUMENT_FRAGMENT_NODE);
    this._host = privateData.host || null;
  }

  _getTheParent(event) {
    if (!event.composed && this === event.originalTarget.getRootNode()) {
      return null;
    }

    return this._host;
  }

  // https://dom.spec.whatwg.org/#ref-for-concept-documentfragment-host%E2%91%A0%E2%91%A3
  get host() {
    return this._host;
  }
  

  get innerHTML() {
    return this.childNodes.join('');
  }

  set innerHTML(html) {
    const {ownerDocument} = this;
    const {constructor} = ownerDocument;
    const document = new constructor;
    document[CUSTOM_ELEMENTS] = ownerDocument[CUSTOM_ELEMENTS];
    const {childNodes} = parseFromString(document, ignoreCase(this), html);

    this.replaceChildren(...childNodes);
  }

}
exports.ShadowRoot = ShadowRoot
