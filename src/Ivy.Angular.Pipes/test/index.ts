/**
 * Could we possibly move this into the TestHelpers with all of the import statements???
 * 
 * By placing this into a reusable function, we could probably ensure that we're always doing this mechanism correctly.
 */


declare var require: any;

// CoreJS PolyFills
import 'core-js/es6';
import 'core-js/es7/reflect';

// ZoneJS PolyFills
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

// RxJS
import 'rxjs';

// Angular
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';


// Configure Angular Testing
TestBed.resetTestEnvironment();

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

// Configure Test Files
const context = require.context('', true, /\.spec\.ts$/);

/*
 * get all the files, for each file, call the context function
 * that will require the file and load it up here.
 */
context.keys().forEach(context);