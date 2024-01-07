let config= {

    appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProductId: String(import.meta.env.VITE_APPWRITE_PRODUCT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteBlogCollectionId: String(import.meta.env.VITE_BLOG_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID)
}

export default config;