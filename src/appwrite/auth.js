import { Client, Account, ID } from "appwrite";
import Config from "../../config/enviroment.js"

class AuthService{
    Client= new Client();
    Account;

    constructor(){
        this.Client
        .setEndpoint(Config.appwriteEndpoint)
        .setProject(Config.appwriteProductId);

        this.Account= new Account(this.Client);
    }

    async createAccount({email,password,name}){

        try{
            const userAccount= await this.Account.create(ID.unique(),email,password,name);
            if(userAccount){
                // if the user Account created succefully then login the user
                return this.login(email,password);
            }else{
                return userAccount;
            }
        }
        catch(error){
           throw error;
        }
    }

    async login({email,password}){
        
        try{
           return await this.Account.createEmailSession(email,password);
        }
        catch(err){
            throw err;
        }
    }

    async getCurrentUser(){

        try{
           return await this.Account.get();
        }
        catch(err){
            throw err;
        }
        return null;
    }

    async logout(){

        try{
          return await this.Account.deleteSessions("current")
        }
        catch(err){
            throw err;
        }
    }

}

const authService = new AuthService();

export default authService;
