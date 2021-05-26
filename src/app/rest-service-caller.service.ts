import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './interfaces/base-service';
import { environment } from 'src/environments/environment.local';

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
    create(restURL : string, inputData : any, outputData : any) : any {
        
        this.httpClient.post<any>(this.url(restURL), inputData).subscribe(responseData => {
            console.log(responseData);
            return responseData;
        });
    }

    url(restUrl : string) : string {
        return environment.baseUrl + restUrl;
    }
}
