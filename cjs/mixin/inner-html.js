'use strict';
const {parseFromString} = require('../shared/parse-from-string.js');
const {
  ignoreCase
} = require('../shared/utils.js');
const {
  CUSTOM_ELEMENTS
} = require('../shared/symbols.js');


module.exports = class InnerHTML {
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