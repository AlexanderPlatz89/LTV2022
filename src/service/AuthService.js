import {executeQuery} from "@/main";
import authenticate from 'raw-loader!./graphql/query/authenticate.graphqls';

export default class AuthService {
    authenticate(username,password){
        const variables = {username: username,password: password}
        return executeQuery(authenticate,variables)
    }
}
