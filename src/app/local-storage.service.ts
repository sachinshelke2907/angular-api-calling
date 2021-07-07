import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

export const STORAGE_KEY ='STORAGE_KEY';
export const NESTED_JSON_START_WITH = 1;
/**
 * This is wrapper service for local storage
 */
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

    /**
     * 
     * @param key 
     * @param value 
     */
    public put(key: string, value: any): void {
        this.storage.set(key, value);
    }

    /**
     * 
     * @param key 
     */
    public remove(key: string): void {
        this.storage.remove(key);
    }

    /**
     * @void
     */
    public clear(): void {
        this.storage.clear();
    }

    /**
     * 
     * @param key
     * @returns
     */
    public get(key: string): any {
        const value = this.storage.get(key);
        if (value) {
            return value;
        }
        return null;
    }

    /**
     * 
     * @param key
     * @returns
     */
    public split(key: string): any {
        return key.split('.');
    }

    /**
     * This is custom method returns nested json value
     * @param key 
     * @returns 
     */
    public find(key: string): any {
        
        let result: any;
        const nestedKey = this.split(key);

        if (nestedKey.length > NESTED_JSON_START_WITH) {
            result = this.get(nestedKey[0]);
            for (let index = 1; index < nestedKey.length; index++) {
                if (!isNaN(Number(nestedKey[index]))) {
                    result = result[Number(nestedKey[index])];
                } else {
                    result = result[nestedKey[index]];
                }     
            }
            return result;
        }else{
            return this.get(key);
        }
    }
}
