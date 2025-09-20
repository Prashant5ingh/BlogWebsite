const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL), // Better way of exporting env variables mostly in production grade apps approach.
     appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    secretKey: String(import.meta.env.VITE_SECRET_KEY),
    tinyapikey: String(import.meta.env.VITE_TINY_API_KEY)
} 

export default conf