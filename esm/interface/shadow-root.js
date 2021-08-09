import {DOCUMENT_FRAGMENT_NODE} from '../shared/constants.js';
import InnerHTML from '../mixin/inner-html.js';
import mixin from '../mixin/mixin.js';
import {NonElementParentNode} from '../mixin/non-element-parent-node.js';

/**
 * @implements globalThis.ShadowRoot
 */
export class ShadowRoot extends NonElementParentNode {
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

mixin(ShadowRoot, InnerHTML);