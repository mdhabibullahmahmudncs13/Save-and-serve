import { Client, Account, Databases, Storage, Functions } from 'appwrite'

const client = new Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const functions = new Functions(client)

export { client }

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
export const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
  ORGANIZATIONS: process.env.NEXT_PUBLIC_ORGANIZATIONS_COLLECTION_ID!,
  DONATIONS: process.env.NEXT_PUBLIC_DONATIONS_COLLECTION_ID!,
  PICKUPS: process.env.NEXT_PUBLIC_PICKUPS_COLLECTION_ID!,
  MESSAGES: process.env.NEXT_PUBLIC_MESSAGES_COLLECTION_ID!,
  NOTIFICATIONS: process.env.NEXT_PUBLIC_NOTIFICATIONS_COLLECTION_ID!,
}

export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!