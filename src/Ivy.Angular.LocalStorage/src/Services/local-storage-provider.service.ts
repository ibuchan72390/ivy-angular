import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageProviderService {

    getLocalStorage(): Storage {
        return localStorage;
    }
}