import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyWebModule } from '../ivy.web.module';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OsDetectionService } from '../src/Services/os-detection.service';

describe('OsDetectionService', () => {

    let sut: OsDetectionService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyWebModule
            ]
        });

        sut = TestBed.get(OsDetectionService);
    });


    // isMac
    it('isMac returns true on correct UserAgentString', () => {

        testOsUserAgentString(
            'mac',
            (sut: OsDetectionService) => sut.isMac(),
            true);
    });


    // isAndroid
    it('isAndroid returns true on correct UserAgentString', () => {

        testOsUserAgentString(
            'android',
            (sut: OsDetectionService) => sut.isAndroid(),
            true);
    });


    // isWindows
    it('isWindows returns true on correct UserAgentString', () => {

        testOsUserAgentString(
            'windows',
            (sut: OsDetectionService) => sut.isWindows(),
            true);
    });


    function testOsUserAgentString(
        expectedOsString: string,
        executeFn: (osDetector: OsDetectionService) => boolean,
        expected: boolean) {

        /**
         * Here we can leverage the singleton context to simply pull and update.
         * That way, we don't have to modify the injected service
         */
        let deviceSvc = TestBed.get(DeviceDetectorService);

        deviceSvc.os = expectedOsString;

        expect(executeFn(sut)).toBe(expected);
    }
});