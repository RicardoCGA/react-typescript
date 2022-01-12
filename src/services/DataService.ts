import {Space} from "../model/Model";

export class DataService {

    public async getSpaces(): Promise<Space[]>{
        const result: Space[] = [];
        result.push({name: 'Japan Location', location: 'Japan', spaceId:'1'});
        result.push({name: 'German Location', location: 'Germany', spaceId:'2'});
        result.push({name: 'Canada Location', location: 'Canada', spaceId:'3'});
        result.push({name: 'Mexico Location', location: 'Mexico', spaceId:'4'});
        result.push({name: 'Paris Location', location: 'Paris', spaceId:'5'});
        return result;
    }

    public async reserveSpace(spaceId:string):Promise<string|undefined> {
        if (spaceId === '3'){
            return('1546236')
        }else{
            return undefined
        }
    }


}