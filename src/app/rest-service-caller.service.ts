import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './interfaces/base-service';
import { environment } from 'src/environments/environment.local';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestServiceCallerService implements BaseService {

    constructor(private httpClient : HttpClient) {}

    /**
     * This method used to post rest call
     * 
     * @param inputData 
     * @param outputData 
     */
    create(restURL : string, inputData : any) : any {
        
        this.httpClient.post<any>(this.url(restURL), inputData).subscribe(responseData => {
            console.log(responseData);
            return responseData;
        });
    }

    /**
     * 
     * @param restURL 
     * @returns 
     */
    fetchAll(restURL : string) : any {

        return this.httpClient.get<any>(this.url(restURL)).pipe(
            map(responseData => {
                const result : any[] = [];
                
                for(const key in responseData){
                    if (responseData.hasOwnProperty(key)) {
                        result.push({ ...responseData[key], id : key });   
                    }
                }
                
                return result;
            }),
            catchError(errorRes => {
                return throwError(errorRes);
            })
        );
    }

    url(restUrl : string) : string {
        return environment.baseUrl + restUrl;
    }

    delete(restUrl : string, deleteByInput : string | number) {
        this.httpClient.delete(this.url(restUrl) + '/' + deleteByInput).subscribe(responseData => {
            console.log(responseData);
        });
    }
}
