'use strict';
const {DOCUMENT_FRAGMENT_NODE} = require('../shared/constants.js');
const InnerHTML = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('../mixin/inner-html.js'));
const mixin = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('../mixin/mixin.js'));
const {NonElementParentNode} = require('../mixin/non-element-parent-node.js');

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
}
exports.ShadowRoot = ShadowRoot

mixin(ShadowRoot, InnerHTML);