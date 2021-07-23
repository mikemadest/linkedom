/**
 * @implements globalThis.ShadowRoot
 */
export class ShadowRoot extends NonElementParentNode implements globalThis.ShadowRoot {
    constructor(ownerDocument: any, privateData?: {});
    _host: any;
    _getTheParent(event: any): any;
    get host(): any;
    set innerHTML(arg: string);
    get innerHTML(): string;
}
import { NonElementParentNode } from "../mixin/non-element-parent-node.js";
