import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyWebModule } from '../ivy.web.module';

import { DeviceDetectorService } from 'ngx-device-detector';
import { MobileDetectionService } from '../src/Services/mobile-detection.service';

describe('MobileDetectionService', () => {

    let sut: MobileDetectionService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyWebModule
            ]
        });

        sut = TestBed.get(MobileDetectionService);

    });

    // isMobile Tests
    it('isMobile properly identifies Android user agent string', () => {

        testBrowserUserAgentString('Android', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies webOS user agent string', () => {

        testBrowserUserAgentString('webOS', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies iPhone user agent string', () => {

        testBrowserUserAgentString('iPhone', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies iPad user agent string', () => {

        testBrowserUserAgentString('iPad', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies iPod user agent string', () => {

        testBrowserUserAgentString('iPod', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies BlackBerry user agent string', () => {

        testBrowserUserAgentString('BlackBerry', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies IEMobile user agent string', () => {

        testBrowserUserAgentString('IEMobile', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies Opera Mini user agent string', () => {

        testBrowserUserAgentString('Opera Mini', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies Mobile user agent string', () => {

        testBrowserUserAgentString('Mobile', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies mobile user agent string', () => {

        testBrowserUserAgentString('mobile', bd => bd.isMobile(), true);
    });

    it('isMobile properly identifies CriOS user agent string', () => {

        testBrowserUserAgentString('CriOS', bd => bd.isMobile(), true);
    });


    // isChromeUndefined Tests
    it('isChromeUndefined properly identifies Chrome user agent string', () => {

        testBrowserUserAgentString('Chrome', bd => bd.isChromeUndefined(), true);
    });


    // isDesktop Tests
    it('isDesktop is true if both isMobile and isChromeUndefined are false', () => {

        const fakeString = "FAKEUSERAGENT";

        testBrowserUserAgentString(fakeString, bd => bd.isMobile(), false);
        testBrowserUserAgentString(fakeString, bd => bd.isChromeUndefined(), false);
        testBrowserUserAgentString(fakeString, bd => bd.isDesktop(), true);
    });



    // Helper Methods
    function testBrowserUserAgentString(
        expectedAgentString: string,
        executeFn: (browserDetector: MobileDetectionService) => boolean,
        expected: boolean) {

        let newAgentString = 'TEST' + expectedAgentString + 'TEST';

        let deviceSvc = TestBed.get(DeviceDetectorService);
        deviceSvc.userAgent = newAgentString;

        let result = executeFn(sut);

        expect(result).toBe(expected);
    }
});