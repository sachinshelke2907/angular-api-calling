export interface BaseService {

    create(restUrl : string, inputData : any, outputData : any) : any;
    
    fetchAll(restUrl : string) : any;

    delete(restUrl : string, deleteByInput : string | number) : void;
}