import {Client,Account,ID,Databases, Query,Storage} from "appwrite"
import Config from "../../config/enviroment.js";

class Services{
    Client;
    Databases;
    Storage;
    constructor(){
        this.Client= new Client()
        .setEndpoint(Config.appwriteEndpoint)
        .setProject(Config.appwriteProductId);

        this.Databases= new Databases(this.Client);
        this.Storage= new Storage(this.Client);
    }

    async createPost({title,content,image,status,blogUserId}){
        console.log(title,content,image,status,blogUserId);
         try{
            return await this.Databases.createDocument(
                Config.appwriteDatabaseId,
                Config.appwriteBlogCollectionId,
                ID.unique(),
                {
                    blogTitle:title,
                    blogData:content,
                    blogImage:image,
                    blogStatus:status,
                    blogUserId:blogUserId
                }
             )
         }
         catch(err){
            throw err;
         }
    }

    async updatePost(blogId,{title,content,image,status}){
        try{
           await this.Databases.updateDocument(
            Config.appwriteDatabaseId,
            Config.appwriteBlogCollectionId,
            blogId,
                {
                    blogTitle:title,
                    blogData:content,
                    blogImage:image,
                    blogStatus:status
                }
            )
        }
        catch(err){
           throw err;
        }
    }

    async deletePost(blogId){
        try{
            await this.Databases.deleteDocument(Config.appwriteDatabaseId,Config.appwriteBlogCollectionId,blogId);
            return true;
        }
        catch(err){
           return false;
        }
    }

    async getDocument(blogId){
        try{
          return await this.Databases.getDocument(Config.appwriteDatabaseId,Config.appwriteBlogCollectionId,blogId);
        }
        catch(err){
            throw err;
        }
    }

    async getDocumentList(){
        try{
           return await this.Databases.listDocuments(
                Config.appwriteDatabaseId,
                Config.appwriteBlogCollectionId,
                [Query.equal("blogStatus",true)]
                )
        }
        catch(err){
            throw err;
        }
    }
    // upload and deleted file service

    async uploadFile(file){
       try{
         return await this.Storage.createFile(Config.appwriteBucketId,ID.unique(),file)
       }
       catch(err){
        throw err;
       }
    }

    async deleteFile(fileId){
        try{
            await this.Storage.deleteFile(Config.appwriteBucketId,fileId);
            return true;
        }
        catch(err){
          return false;
        }
    }


     previewFile(fileId){
        try{
            // getFilePreview fucntion promise return nahi karta hai
          return this.Storage.getFilePreview(Config.appwriteBucketId,fileId);
        }
        catch(err){
            throw err;
        }
    }
}

let service= new Services();

export default service;