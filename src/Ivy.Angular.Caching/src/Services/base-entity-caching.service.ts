// Angular
import { Injectable } from '@angular/core';

// 3rd Party
import { Observable, Subscription, Observer } from 'rxjs';

// Services
import { CollectionHelper } from 'ivy.angular.value-helpers';
import { BaseEntity } from 'ivy.angular.data';

@Injectable()
export abstract class BaseEntityCachingService<TEntity extends BaseEntity> {

    protected configCache: TEntity[] = [];

    private rxInWaiting: Subscription = null;
    private internalInitFn: () => Observable<TEntity[]>;

    private initialized: boolean = false;

    constructor(
        protected collSvc: CollectionHelper) {
    }

    protected init(initFn: () => Observable<TEntity[]>): void {

        if (this.internalInitFn == null) {

            this.internalInitFn = initFn;
            this.reInit().subscribe();

        } else {

            throw new Error('Service is already initialized!');
        }
    }

    reInit(): Observable<TEntity[]> {

        return Observable.create((observer: Observer<TEntity[]>) => {

            if (this.internalInitFn == null) {

                let err = 'Internal Init Fn is null, unable to reInit!';

                console.log(err);
                observer.error(err);
                observer.complete();

            } else if (this.rxInWaiting != null) {

                console.log('ReInit skipped, rxInWaiting exists');
                this.rxInWaiting.add(() => {
                    observer.next(this.configCache);
                    observer.complete();
                });

            } else {

                this.rxInWaiting = this.internalInitFn().subscribe(
                    (success: TEntity[]) => {
                        this.configCache = success;
                        this.initialized = true;
                        this.rxInWaiting = null;
                        observer.next(success);
                        observer.complete();
                    },
                    (err: Error) => {
                        console.log(err);
                        observer.error(err);
                        observer.complete();
                    }
                );
            }
        });
    }

    isInitialized(): boolean {

        return this.initialized;
    }

    clearCache(): void {
        this.configCache = [];
        //this.internalInitFn = null; // No need, we want them to reInit()
        this.initialized = false;
    }

    getCache(): Observable<TEntity[]> {

        // Once this is intiialized, it seems that rxInWaiting == null
        // Cache could be empty - i.e. student registered classes
        if (!this.initialized) {

            return Observable.create((observer: Observer<TEntity[]>) => {

                if (this.rxInWaiting == null) {

                    observer.error('Attempting to getCache, but the service has not been initialized!');
                    return;
                }

                this.rxInWaiting.add(
                    (success: TEntity[]) => {
                        observer.next(this.configCache);
                        observer.complete();
                    }
                );

            });

        } else {

            return Observable.create((observer: Observer<TEntity[]>) => {
                observer.next(this.configCache);
                observer.complete();
            });

        }
    }

    getById(id: number): Observable<TEntity> {

        return this.returnFromCache(cache => this.collSvc.getEntityById(cache, id));
    }

    protected updateCachedConfigs(updateConfigs: TEntity[]): void {

        for (var i = 0; i < updateConfigs.length; i++) {
            let updateConfig = updateConfigs[i];
            let matchingConfigs = this.configCache.filter(x => x.id == updateConfig.id);

            if (matchingConfigs.length != 1) {
                throw new Error('Unable to update cached config.  Unable to find Id in cache.  Id: ' + updateConfig.id);
            }

            let matchingConfig = matchingConfigs[0];
            matchingConfig = updateConfig;
        }
    }

    protected returnFromCache<T>(returnFn: (cache: TEntity[]) => T): Observable<T> {

        return Observable.create((observer: Observer<TEntity[]>) => {

            if (this.rxInWaiting != null) {

                this.rxInWaiting.add(() => {

                    this.handleCacheReturn(observer, returnFn);
                })

            } else {

                this.handleCacheReturn(observer, returnFn);
            }
        });
    }


    private handleCacheReturn<T>(observer: any, returnFn: (cache: TEntity[]) => T): void {

        let result = returnFn(this.configCache);

        observer.next(result);
        observer.complete();
    }
}