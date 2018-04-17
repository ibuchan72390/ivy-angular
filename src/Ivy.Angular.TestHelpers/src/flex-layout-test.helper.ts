import { DebugElement } from '@angular/core';

import { LayoutDirective, LayoutAlignDirective } from '@angular/flex-layout';

export class FlexLayoutTestHelper {

    static getFxLayoutValue(elem: DebugElement): string {

        let layoutDir: LayoutDirective = elem.injector.get(LayoutDirective);

        // This is seemingly the only way I can read the value of this directive
        // Even the _inputMap is hidden behind some inheritance classes,
        // must access these values with JS Attribute Dictionary approach
        let dirInputMap: any = layoutDir['_inputMap'];
        let layout: string = dirInputMap['layout'];

        return layout;
    }

    static getFxLayoutAlignValue(elem: DebugElement): string {

        let layoutAlignDir: LayoutAlignDirective = elem.injector.get(LayoutAlignDirective);

        let alignDirInputMap: any = layoutAlignDir['_inputMap'];
        let align: string = alignDirInputMap['align'];

        return align;
    }
}