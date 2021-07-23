import {DOCUMENT_FRAGMENT_NODE} from '../shared/constants.js';
import {NonElementParentNode} from '../mixin/non-element-parent-node.js';
import {parseFromString} from '../shared/parse-from-string.js';

import {
  ignoreCase,
} from '../shared/utils.js';

import {
  CUSTOM_ELEMENTS
} from '../shared/symbols.js';

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
