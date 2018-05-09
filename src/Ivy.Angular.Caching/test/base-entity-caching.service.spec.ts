import 'jasmine';

import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subscription, Observable, Observer } from 'rxjs';

import { IvyValueHelpersModule, CollectionHelper } from 'ivy.angular.value-helpers';

import { BaseEntityCachingService } from '../src/Services/base-entity-caching.service';

import { BaseEntity } from 'ivy.angular.data';

const testDataLength = 5;

describe('BaseEntityCachingService', () => {

    // Variables
    let svc: TestEntityCachingService;


    // Tests
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyValueHelpersModule
            ],
            providers: [
                TestEntityCachingService
            ]
        });

        svc = TestBed.get(TestEntityCachingService);
    });


    // Constructor
    it('cache is loaded upon constructor initailization', doneFn => {

        expect(svc.getInitCount()).toBe(0);

        svc.externalInit();

        svc.completeInit().subscribe(
            result => {

                expect(svc.getInitCount()).toBe(1);

                let cache = svc.readCache();

                expect(cache.length).toBe(testDataLength);

                for (var i = 0; i < cache.length; i++) {

                    let cached: TestEntity = cache[i];

                    expect(cached.id).toBe(i);
                }

                doneFn();
            }
        );
    });


    // ReInit
    it('reInit throws error if initFn has not yet been executed', doneFn => {

        expect(svc.getInitCount()).toBe(0);

        svc.reInit().subscribe(
            success => {
                throw 'This should not have been successful';
            },
            err => {
                expect(err).toBe('Internal Init Fn is null, unable to reInit!');
                doneFn();
            },
        );
    });

    it('reInit fires init process again', doneFn => {

        expect(svc.getInitCount()).toBe(0);

        svc.externalInit();

        svc.completeInit().subscribe(
            result => {

                expect(svc.getInitCount()).toBe(1);

                svc.reInit().subscribe(
                    final => {

                        expect(svc.getInitCount()).toBe(2);

                        doneFn();
                    }
                );

                // Required to make the above fire
                svc.completeInit().subscribe();
            }
        );
    });

    it('reInit stacks the init processes to ensure we do not fire multiple reinits at once', doneFn => {

        expect(svc.getInitCount()).toBe(0);

        svc.externalInit();

        svc.completeInit().subscribe(
            result => {

                expect(svc.getInitCount()).toBe(1);

                // Executing these two in a row before allowing completion should not stack
                // We should only see one more reInit from the double execution
                svc.reInit().subscribe(
                    final => {
                        expect(svc.getInitCount()).toBe(2);
                    }
                );

                svc.reInit().subscribe(
                    final => {

                        expect(svc.getInitCount()).toBe(2);

                        doneFn();
                    }
                );

                // Required to make the above fire
                svc.completeInit().subscribe();
            }
        );
    });


    // isInitialized
    it('cache properly tracks the initialization', doneFn => {

        svc.externalInit();

        expect(svc.isInitialized()).toBeFalsy();

        svc.completeInit().subscribe(
            result => {

                expect(svc.isInitialized()).toBeTruthy();

                doneFn();
            }
        );

    });


    // clearCache
    it('cache is cleared after we execute clearCache()', doneFn => {

        svc.externalInit();

        svc.completeInit().subscribe(
            result => {

                expect(svc.isInitialized()).toBeTruthy();

                let cache = svc.readCache();

                expect(cache.length).toBe(testDataLength);

                svc.clearCache();

                expect(svc.isInitialized()).toBeFalsy();

                cache = svc.readCache();

                expect(cache.length).toBe(0);

                doneFn();
            }
        );
    });


    // getCache
    it('getCache throws a proper exception if the service has not yet been initialized', () => {

        svc.getCache().subscribe(
            result => {
                throw 'unexpected observable result received';
            },
            err => {

                expect(err).toBe('Attempting to getCache, but the service has not been initialized!');
            }
        );
    });

    it('getCache returns immediately if cache is populated', doneFn => {

        svc.externalInit();

        svc.completeInit().subscribe(
            result => {

                let cache: TestEntity[] = [];
                svc.getCache().subscribe(result => cache = result);

                expect(cache).toBe(svc.readCache());

                doneFn();
            }
        );
    });

    it('getCache returns cache after init is completed', doneFn => {

        svc.externalInit();

        let cache: TestEntity[] = [];
        svc.getCache().subscribe(result => cache = result);

        expect(cache.length).toBe(0);

        svc.completeInit().subscribe(
            result => {

                expect(cache).toBe(svc.readCache());

                doneFn();
            }
        );
    });

    // getById
    it('getById returns immediately if cache is populated', doneFn => {

        const cacheId = 0;

        svc.externalInit();

        svc.completeInit().subscribe(
            result => {

                let cache: TestEntity = null;
                svc.getById(cacheId).subscribe(result => cache = result);

                expect(cache.id).toBe(cacheId);

                doneFn();
            }
        );
    });

    it('getById returns after cache init is completed', doneFn => {

        const cacheId = 0;

        svc.externalInit();

        let cache: TestEntity = null;
        svc.getById(cacheId).subscribe(result => cache = result);

        expect(cache).toBe(null);

        svc.completeInit().subscribe(
            result => {

                expect(cache.id).toBe(cacheId);

                doneFn();
            }
        );
    });

});

@Injectable()
class TestEntityCachingService extends BaseEntityCachingService<TestEntity> {

    private initObserver: Observer<TestEntity[]>;
    private initCount: number = 0;

    constructor(
        protected collSvc: CollectionHelper) {

        super(collSvc);
    }

    /**
     * We will use these functions to mock an asynchronous initialization process
     * InitFn will properly setup the asynchronous init; however, it will not complete
     * until we execute the completeInitFn();
     */
    initFn(): Observable<TestEntity[]> {

        return Observable.create((observer: Observer<TestEntity[]>) => { 

            this.initObserver = observer;
        });
    }

    externalInit(): void {
        this.init(() => this.initFn());
    }

    completeInit(): Observable<void> {

        return Observable.create((observer: Observer<null>) => {

            this.initCount++;

            let entities = this.collSvc.range(testDataLength)
                .map(x => new TestEntity());

            for (var i = 0; i < entities.length; i++) {

                entities[i].id = i;
            }

            this.initObserver.next(entities);
            this.initObserver.complete();

            observer.next(null);
            observer.complete();
        });
    }

    readCache(): TestEntity[] {
        return this.configCache;
    }

    getInitCount(): number {
        return this.initCount;
    }
}

class TestEntity extends BaseEntity {
}
