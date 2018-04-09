import { Injectable } from '@angular/core';

import { LocalStorageProviderService } from './local-storage-provider.service';

@Injectable()
export class LocalStorageService {
    
    constructor(
        private storageProvider: LocalStorageProviderService) {
    }


    saveString(key: string, val: string): void {
        this.store().setItem(key, val);
    }

    getString(key: string): string {
        return this.store().getItem(key);
    }

    saveObject<T>(key: string, obj: T): void {
        let json = JSON.stringify(obj);
        this.store().setItem(key, json);
    }

    getObject<T>(key: string): T {
        let json = this.store().getItem(key);
        return JSON.parse(json) as T;
    }

    remove(key: string): void {
        this.store().removeItem(key);
    }

    clear(): void {
        this.store().clear();
    }


    private store(): Storage {
        return this.storageProvider.getLocalStorage();
    }
}