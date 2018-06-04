import 'jasmine';

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IvyAngularTurnJsModule } from '../ivy.angular.turn-js.module';

import { ImgFlipBookComponent } from '../src/Components/ImgFlipBook/img-flip-book.component';

import { TurnOptionGeneratorService } from '../src/Services/turn-option-generator.service';
import { TurnElementInvokerService } from '../src/Services/turn-element-invoker.service';

describe('ImgFlipBookComponent', () => {

    // Variables
    let fixture: ComponentFixture<ImgFlipBookComponent>;
    let sut: ImgFlipBookComponent;

    let optionsGenSpy: jasmine.SpyObj<TurnOptionGeneratorService>;
    let turnInvokerSpy: jasmine.SpyObj<TurnElementInvokerService>;

    const options: any = {};

    // Setup
    beforeEach(() => {

        optionsGenSpy = jasmine.createSpyObj({ 'generateTurnOptions': options });
        turnInvokerSpy = jasmine.createSpyObj(['invokeTurn']);

        TestBed.configureTestingModule({
            imports: [
                IvyAngularTurnJsModule
            ],

            // Mock these out so we don't have to worry about actual invocation
            // This way we can test the rendering prior to the Turn invocation
            providers: [
                { provide: TurnOptionGeneratorService, useValue: optionsGenSpy },
                { provide: TurnElementInvokerService, useValue: turnInvokerSpy }
            ]
        });

        fixture = TestBed.createComponent(ImgFlipBookComponent);
        sut = fixture.componentInstance;
    });


    // Tests
    it('imgSources render as expected', () => {

        let imgSrcs = [
            'https://img-aws.ehowcdn.com/750x428p/cpi.studiod.com/www_ehow_com/i.ehow.com/images/a06/3a/be/study-compass-math-placement-test-800x800.jpg',
            'http://eventzerz.com/wp-content/uploads/2018/03/Test-Logo-Small-Black-transparent-1.png',
            'https://images.sftcdn.net/images/t_optimized,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg',
            'https://lacphoto.org/berenice/wp-content/uploads/Test-Logo.svg.png',
            'https://vignette.wikia.nocookie.net/googology/images/f/f3/Test.jpeg/revision/latest?cb=20180121032443',
            'http://wp.patheos.com.s3.amazonaws.com/blogs/faithwalkers/files/2013/03/bigstock-Test-word-on-white-keyboard-27134336.jpg'
        ];

        sut.imgSources = imgSrcs;

        fixture.detectChanges();

        let imgElems = fixture.debugElement.queryAll(By.css('img'));

        for (var i = 0; i < imgElems.length; i++) {

            let elem = imgElems[i];

            let imgSrcIndex = imgSrcs.indexOf(elem.nativeElement.src);
            imgSrcs.splice(imgSrcIndex, 1);
        }

        expect(imgSrcs.length).toBe(0);
    });

    it('afterViewInit executes as expected', () => {

        const maxWidth: number = 1000;
        const ratio: number = 2;

        let imgSrcs = [
            'https://img-aws.ehowcdn.com/750x428p/cpi.studiod.com/www_ehow_com/i.ehow.com/images/a06/3a/be/study-compass-math-placement-test-800x800.jpg',
            'http://eventzerz.com/wp-content/uploads/2018/03/Test-Logo-Small-Black-transparent-1.png',
            'https://images.sftcdn.net/images/t_optimized,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg',
            'https://lacphoto.org/berenice/wp-content/uploads/Test-Logo.svg.png',
            'https://vignette.wikia.nocookie.net/googology/images/f/f3/Test.jpeg/revision/latest?cb=20180121032443',
            'http://wp.patheos.com.s3.amazonaws.com/blogs/faithwalkers/files/2013/03/bigstock-Test-word-on-white-keyboard-27134336.jpg'
        ];

        sut.imgSources = imgSrcs;
        sut.imgHeightToWidthRatio = ratio;
        sut.maxPxWidth = maxWidth;

        fixture.detectChanges();

        expect(optionsGenSpy.generateTurnOptions).toHaveBeenCalledTimes(1);
        expect(optionsGenSpy.generateTurnOptions).toHaveBeenCalledWith(
            sut.flipbookContainerElem.nativeElement.clientWidth, maxWidth, ratio, undefined);

        expect(turnInvokerSpy.invokeTurn).toHaveBeenCalledTimes(1);
        expect(turnInvokerSpy.invokeTurn).toHaveBeenCalledWith(
            sut.flipbookElem, options);
    });

    it('afterViewInit executes as expected with override', () => {

        const maxWidth: number = 1000;
        const ratio: number = 2;

        let imgSrcs = [
            'https://img-aws.ehowcdn.com/750x428p/cpi.studiod.com/www_ehow_com/i.ehow.com/images/a06/3a/be/study-compass-math-placement-test-800x800.jpg',
            'http://eventzerz.com/wp-content/uploads/2018/03/Test-Logo-Small-Black-transparent-1.png',
            'https://images.sftcdn.net/images/t_optimized,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg',
            'https://lacphoto.org/berenice/wp-content/uploads/Test-Logo.svg.png',
            'https://vignette.wikia.nocookie.net/googology/images/f/f3/Test.jpeg/revision/latest?cb=20180121032443',
            'http://wp.patheos.com.s3.amazonaws.com/blogs/faithwalkers/files/2013/03/bigstock-Test-word-on-white-keyboard-27134336.jpg'
        ];

        let override = {
            test: 'testing'
        };

        sut.imgSources = imgSrcs;
        sut.imgHeightToWidthRatio = ratio;
        sut.maxPxWidth = maxWidth;
        sut.optionsOverrides = override;

        fixture.detectChanges();

        expect(optionsGenSpy.generateTurnOptions).toHaveBeenCalledTimes(1);
        expect(optionsGenSpy.generateTurnOptions).toHaveBeenCalledWith(
            sut.flipbookContainerElem.nativeElement.clientWidth, maxWidth,
            ratio, override);

        expect(turnInvokerSpy.invokeTurn).toHaveBeenCalledTimes(1);
        expect(turnInvokerSpy.invokeTurn).toHaveBeenCalledWith(
            sut.flipbookElem, options);
    });
});