import {parseFromString} from '../shared/parse-from-string.js';
import {
  ignoreCase,
} from '../shared/utils.js';
import {
  CUSTOM_ELEMENTS
} from '../shared/symbols.js';


export default class InnerHTML {
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