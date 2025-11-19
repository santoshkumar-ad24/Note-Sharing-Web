# LocalNote – Simple URL-Based Note Sharing App (File Storage)

SanNotes is a lightweight note-sharing application, built using **Express.js**.  
It allows users to create, edit, and access notes anytime by simply entering a note name.  
Each note is stored as a `.txt` file on the server, making it extremely simple and fast.

---

## 🚀 Features

- ✍️ Create notes using a custom name (ex: `san`, `santosh`, `todo`)
- 📁 Notes are saved as local text files inside the `files/` folder
- 🔄 Opening an existing note loads its previous saved content
- 💾 Save button updates the file and redirects to the home page
- 🌐 Accessible anytime from any device (as long as server is running)
- 🧠 No login, no database — only simple file storage

---

## 🛠️ How It Works

### 1. Enter a Note Name
On the homepage, you will see an input field asking for a note/domain name.

Example inputs:
1. demo
2. santosh
3. work
4. myideas


### 2. A File Is Automatically Created
If the user enters **san**, the server creates:

files/san.txt

If the file already exists → the note content is loaded.

### 3. Redirect to Writing Page
The user is redirected to:

/san/notes

This page contains:
- A text area to write notes  
- A **Save** button  

### 4. Save Notes
When clicking **Save**:
- Content is saved to `files/san.txt`
- User is redirected back to the home page

When they return later → all previous text appears automatically.

---

## 📂 Project Structure

project/
│
├── server.js
├── files/ // All note .txt files stored here
├── views/
│ ├── index.ejs // Home page
│ └── notes.ejs // Notes editor page
└── public/ // CSS, JS //static assets


---

## ▶️ Run the App

Install dependencies:

```bash
npm install
Start the server:
node server.js

Open in browser:
http://127.0.0.1:3000

🧩 Tech Used
Node.js
Express.js
EJS
File System (fs) for reading & writing notes
Path 

🌱 Future Improvements
Switch from local files to database (MongoDB / Firebase)
Add note history
Add public/private note mode
Add shareable links
Add collaborative real-time editing using WebSockets