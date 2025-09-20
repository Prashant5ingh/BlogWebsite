import conf from "../conf/conf";
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);   

// const sdk = require('node-appwrite');
// import sdk from "node-appwrite";  // this will also work

// // Init SDK 


// const client = new sdk.Client()
//     .setEndpoint(conf.appwriteUrl) // Your API Endpoint
//     .setProject(conf.appwriteProjectId) // Your project ID
//     .setKey(conf.secretKey); // Your secret API key

// const databases = new sdk.Databases(client);

// const result = await databases.get({
//     databaseId: conf.appwriteDatabaseId
// });
// console.log(result); // Success


import { Client, ID, TablesDB, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
    client = new Client();
    databases;
    tablesDB;
    bucket;  // also known as storage

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        // this.databases = new Databases(this.client);
        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({  // TableDB.createRow()
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,  // can give unique ID also 
                data: {
                    "title": title,
                    "content": content,
                    "featuredImage": featuredImage,
                    "status": status,
                    "userId": userId,
                }


            })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,  // can give unique ID also
                data: {
                    "title": title,
                    "content": content,
                    "featuredImage": featuredImage,
                    "status": status,

                }
            })
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,  // can give unique ID also

            })
            return true // success deletion
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {  // single post or document or row
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            })
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(tableQueries = [Query.equal("status", "active")]) { // Posts whose status is active. Indexes of table is used to apply Query. "queries" is var of array and name could be anything. 
        try {

            // result of getposts or function returns gives array of list of Rows
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries: tableQueries,

            }
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


    // file upload service and later create these services in different file.
    async uploadFile(fileName) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: fileName,
                permissions: ['read("any")'] // optional
            })
        }
        catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }

    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId // shorthand for fileId:fileId
            })
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) { // returns a url after getting image id from database via PostCard
        // console.log(fileId)
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId
        })
    }
}

const dataService = new DatabaseService();
export default dataService;
