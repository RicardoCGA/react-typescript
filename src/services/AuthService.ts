import {User, UserAttribute} from "../model/Model";

export class AuthService {

    public async login (userName: string, password: string): Promise<User | undefined>{
        if ( userName === 'Ricardo' && password === '123'){
            return {
                userName: 'Ricardo C',
                email: 'email@domain.com'
            };
        }else{
            return undefined;
        }
    }

    public async getUserAttributes(user:User): Promise<UserAttribute[]> {
        const result: UserAttribute[] = [];
        result.push({name:'description', value:'Good user'})
        result.push({name:'Job', value:'Worker'})
        result.push({name:'Age', value:'38'})
        result.push({name:'Experience', value:'10 years'})
        return result;
    }

}