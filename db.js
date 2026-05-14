const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);
let db;

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        db = client.db('notes');
        console.log('✅ Connected to MongoDB Atlas');
        return db;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
}

// Get database instance
function getDB() {
    if (!db) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return db;
}

// Get or create a note
async function getNote(title) {
    try {
        const notesCollection = getDB().collection('notes');
        
        // Find note by title
        let note = await notesCollection.findOne({ title: title });
        let content = "";
        
        if (note) {
            content = note.content;
        } else {
            // Create new note if it doesn't exist
            await notesCollection.insertOne({
                title: title,
                content: "",
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        
        return content;
    } catch (error) {
        console.error('Error fetching note:', error);
        throw error;
    }
}

// Save note content
async function saveNote(title, content) {
    try {
        const notesCollection = getDB().collection('notes');
        
        // Update or insert note
        const result = await notesCollection.updateOne(
            { title: title },
            {
                $set: {
                    content: content,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );
        
        return result;
    } catch (error) {
        console.error('Error saving note:', error);
        throw error;
    }
}

// Get all notes (optional - useful for displaying notes list)
async function getAllNotes() {
    try {
        const notesCollection = getDB().collection('notes');
        return await notesCollection.find({}).toArray();
    } catch (error) {
        console.error('Error fetching all notes:', error);
        throw error;
    }
}

// Delete a note (optional)
async function deleteNote(title) {
    try {
        const notesCollection = getDB().collection('notes');
        return await notesCollection.deleteOne({ title: title });
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
}

// Close database connection
async function closeDB() {
    try {
        await client.close();
        console.log('✅ MongoDB connection closed');
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
}

module.exports = {
    connectDB,
    getDB,
    getNote,
    saveNote,
    getAllNotes,
    deleteNote,
    closeDB
};
