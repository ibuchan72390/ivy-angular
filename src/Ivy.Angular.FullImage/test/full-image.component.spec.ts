import 'jasmine';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ValidationHelper } from 'ivy.angular.value-helpers';

import { IvyValueHelpersModule } from 'ivy.angular.value-helpers';
import { IvyAngularFullImageModule } from '../ivy.angular.full-image.module';

import { FullImageComponent } from '../src/Component/FullImage/full-image.component';

describe('FullImageComponent', () => {

    // Variables
    let fixture: ComponentFixture<FullImageComponent>;
    let sut: FullImageComponent;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularFullImageModule,
                IvyValueHelpersModule
            ]
        });

        fixture = TestBed.createComponent(FullImageComponent);
        sut = fixture.componentInstance;
    });


    // Tests
    it('FullImageComponent throws error if src not valid on init', () => {

        sut.src = null;

        expect(() => sut.ngOnInit()).toThrow('FullImageComponent must have a src before the component has been initialized!');
    });

    it('FullImageComponent sets src on image appropriately if valid, and no border until load fired', () => {

        sut.src = "http://hanassets.nd.gov/images/product/test.png";

        fixture.detectChanges();

        let imgElem = fixture.debugElement.nativeElement.querySelector('img');

        expect(imgElem.src).toEqual(sut.src);
    });
});