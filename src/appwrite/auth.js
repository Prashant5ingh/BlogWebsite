import conf from "../conf/conf";
import { Client, Account, ID,Permission,Role } from "appwrite";

// Creating services with code improvement of appwrite auth. It makes this code compatible with other services like firbase or custom backend.
export class AuthService {
    client = new Client()

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({ userId: ID.unique(), email: email, password: password, name: name });
            if (userAccount) // call another method --> login if user account already exists or login just after signup
            {
                return this.login({ email, password }); // return the login method so that user directly logged in after signup. Or we can simple display the msg to go login page after successful signup. Your Choice !!!
            }
            else return userAccount;

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email: email, password: password });

        } catch (error) {
            throw error

        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get() // to see if user is logged in or use if else condition for not logged in.
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error); // custom error msg instead throw
        }

        return null; // if user not logged in return null

    }

        async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}


const authService = new AuthService() // Need object to access the methods.
export default authService