const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionIdUserPost: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USER_POST),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUKET_ID),
}

export default conf;