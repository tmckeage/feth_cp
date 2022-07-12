
// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
}; 

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
//  const context1 = require.context('./', true, /equipment.component\.spec\.ts$/);
//  const context2 = require.context('./', true, /review.component\.spec\.ts$/);
//  const context3 = require.context('./', true, /analysis.component\.spec\.ts$/);
//  const context4 = require.context('./', true, /element.component\.spec\.ts$/);
// And load the modules.
//context1.keys().map(context1);
//context2.keys().map(context2);
// context3.keys().map(context3);
// context4.keys().map(context4);