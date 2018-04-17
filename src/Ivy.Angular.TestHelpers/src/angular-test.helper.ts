import { DebugElement } from '@angular/core';

import * as Case from 'case';


/**
 * I find that in some abstracted components, it makes sense to test what we're binding in and where
 * This allows us to use more of a mocking pattern for approaching Component testing
 * By testing the child component that is invoked, we should only have to test what is being passed to it
 * 
 * Angular wraps up some of these names in a custom dynamic naming convention, this allows us to access them.
 */
export class AngularTestHelper {

    static getNgAttrName(attr: string): string {

        let kebabAttr = Case.kebab(attr);
        return 'ng-reflect-' + kebabAttr;
    }

    static getNgAttrVal(attr: string, elem: DebugElement): string {

        let attrName = this.getNgAttrName(attr);

        let nodeAttrs: NamedNodeMap = elem.nativeElement.attributes;

        let nodeAttr = nodeAttrs.getNamedItem(attrName);

        if (nodeAttr == null) {
            throw 'Unable to find ngAttr on Element! Name: ' + attr;
        }

        let elemAttr: any = elem.nativeElement.attributes[attrName];

        return elemAttr.value;
    }
}