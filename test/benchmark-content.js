let browser = false;

const bench = (name, count, times) => {
  let total = 0;
  for (let i = 0; i < times; i++) {
    const timeName = `${name} \x1b[2m${i < 1 ? 'cold' : ' hot'}\x1b[0m`;
    console.time(clean(timeName));
    total = count();
    console.timeEnd(clean(timeName));
  }
  return total;
};

const clean = str => browser ? str.replace(/\x1b\[\dm/g, '') : str;

const crawl = (element, kind) => {
  const nodes = element[kind];
  const {length} = nodes;
  let count = length;
  for (let i = 0; i < length; i++)
    count += crawl(nodes[i], kind);
  return count;
};

const sleep = ms => new Promise($ => setTimeout($, ms));

const onContent = async (createDocument, html, times) => {

  let document;
  try {
    console.time(clean('parsing \x1b[2mcold\x1b[0m'));
    document = createDocument(html.toString());
    console.timeEnd(clean('parsing \x1b[2mcold\x1b[0m'));
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to parse the document: ${o_O.message}`));
    process.exit(1);
  }
  console.log();

  try {
    console.log('total childNodes', bench('crawling childNodes', () => crawl(document.documentElement, 'childNodes'), times));
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to crawl childNodes: ${o_O.message}`));
  }
  console.log();

  await sleep(300);

  try {
    console.log('total children', bench('crawling children', () => crawl(document.documentElement, 'children'), times));
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to crawl children: ${o_O.message}`));
  }
  console.log();

  //* uncomment to make most alternative explode with html.html test
  await sleep(300);

  try {
    const html = bench('html.cloneNode(true)', () => document.documentElement.cloneNode(true), 1);
    console.log('cloning: OK');
    if (html.outerHTML.length !== document.documentElement.outerHTML.length)
      throw new Error('invalid output');
    console.log('outcome: OK');
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to clone html: ${o_O.message}`));
  }
  console.log();
  //*/

  await sleep(300);

  try {
    console.log('total div', bench('querySelectorAll("div")', () => document.documentElement.querySelectorAll('div').length, times));
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to querySelectorAll("div"): ${o_O.message}`));
  }
  console.log();

  await sleep(300);

  try {
    console.log('total p', bench('getElementsByTagName("p")', () => document.documentElement.getElementsByTagName('p').length, times));
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to getElementsByTagName("p"): ${o_O.message}`));
  }
  console.log();

  await sleep(300);

  try {
    const divs = document.documentElement.querySelectorAll('div');
    console.time('removing divs');
    divs.forEach(div => {
      div.remove();
    });
    console.timeEnd('removing divs');
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to div.remove() them all: ${o_O.message}`));
  }
  console.log();

  await sleep(300);

  try {
    console.log('total div', bench('div count', () => document.documentElement.getElementsByTagName('div').length, 1));
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to getElementsByTagName("div"): ${o_O.message}`));
  }
  console.log();

  await sleep(300);

  try {
    console.log('total p', bench('p count', () => document.documentElement.getElementsByTagName('p').length, 1));
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to getElementsByTagName("p"): ${o_O.message}`));
  }
  console.log();

  //* maybe OK here
  await sleep(300);

  try {
    const html = bench('html.cloneNode(true)', () => document.documentElement.cloneNode(true), 1);
    console.log('cloning: OK');
    if (html.outerHTML.length !== document.documentElement.outerHTML.length)
      throw new Error('invalid output');
    console.log('outcome: OK');
  }
  catch (o_O) {
    console.warn(clean(`⚠ \x1b[1merror\x1b[0m - unable to clone html: ${o_O.message}`));
  }
  console.log();
  //*/
};

try {
  module.exports = onContent;
}
catch (o_O) {
  browser = true;
  onContent(
    html => {
      return (new DOMParser).parseFromString(html, 'text/html');
    },
    `<!DOCTYPE html>${document.documentElement.outerHTML}`,
    2
  );
}