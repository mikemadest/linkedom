const assert = require('../assert.js').for('Node');

const {parseHTML} = global[Symbol.for('linkedom')];

const {document} = parseHTML('<html><head /><body><div /></body></html>');

const [head, body, div] = document.querySelectorAll('head,body,div');

assert(body.compareDocumentPosition(body), 0, 'body.compare(body)');
assert(body.compareDocumentPosition(div), 20, 'body.compare(div)');
assert(div.compareDocumentPosition(body), 10, 'div.compare(body)');
assert(body.compareDocumentPosition(head), 2, 'body.compare(head)');
assert(head.compareDocumentPosition(body), 4, 'head.compare(body)');
assert(div.compareDocumentPosition(head), 2, 'div.compare(head)');
assert(head.compareDocumentPosition(div), 4, 'head.compare(div)');
assert(head.compareDocumentPosition(document.createElement('nope')), 35, 'head.compare(disconnected)');
assert(document.createElement('nope').compareDocumentPosition(head), 37, 'head.compare(disconnected)');


assert(body.ELEMENT_NODE, 1);
assert(body.ATTRIBUTE_NODE, 2);
assert(body.TEXT_NODE, 3);
assert(body.COMMENT_NODE, 8);
assert(body.DOCUMENT_NODE, 9);
assert(body.DOCUMENT_TYPE_NODE, 10);
assert(body.DOCUMENT_FRAGMENT_NODE, 11);


assert(body.ELEMENT_NODE, body.constructor.ELEMENT_NODE);
assert(body.ATTRIBUTE_NODE, body.constructor.ATTRIBUTE_NODE);
assert(body.TEXT_NODE, body.constructor.TEXT_NODE);
assert(body.COMMENT_NODE, body.constructor.COMMENT_NODE);
assert(body.DOCUMENT_NODE, body.constructor.DOCUMENT_NODE);
assert(body.DOCUMENT_TYPE_NODE, body.constructor.DOCUMENT_TYPE_NODE);
assert(body.DOCUMENT_FRAGMENT_NODE, body.constructor.DOCUMENT_FRAGMENT_NODE);
