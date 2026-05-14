# Textora – Cloud-Based Note Sharing App

Textora is a lightweight note-sharing application built using **Node.js, Express.js**.  
It allows users to create, edit, and access notes anytime by simply entering a note name.  
Notes are stored securely in a   cloud database, making it accessible from anywhere.

---

## 🚀 Features

- ✍️ Create notes using a custom name (ex: `san`, `saniova`, `todo`, `projects`)
- ☁️ Notes are saved to cloud database
- 🔄 Opening an existing note loads its previous saved content
- 💾 Save button updates the database and redirects to the home page
- 🌐 Accessible anytime from any device (cloud-based)
- ⚡ Real-time synchronization with cloud storage

---

## 🛠️ How It Works

### 1. Enter a Note Title
On the homepage, enter a note title/name.

Example inputs:
- `demo`
- `santosh`
- `work-tasks`
- `my-ideas`


If the document already exists → the note content is loaded.

### 2. Redirect to Editor Page
The user is redirected to: `/san/`

This page contains:
- A text area to write/edit notes  
- A **Save** button  
- Auto-save indicator

### 3. Save Notes to Cloud
When clicking **Save**:
- Content is saved to  Database
- User is redirected back to the home page

When they return later → all previous text appears automatically from the database.

---


## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd learn-node
```

### 2. Install Dependencies
```bash
npm install
```


### 3. Start the Server
```bash
npm start
```

Or with auto-reload (development):
```bash
npm run dev
```

### 4. Open in Browser
```
http://127.0.0.1:3000
```

---

## 🧩 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**:  Database (Cloud)
- **Frontend**: EJS, HTML, CSS, Vanilla JavaScript
- **Server**: Runs on port 3000 (configurable)

---


## 🌱 Future Improvements

- Add user authentication & login system
- Add note history/versioning
- Add public/private note sharing
- Add collaborative real-time editing (WebSockets)
- Add note categories/tags
- Add markdown support
- Add dark mode
- Add note search functionality

---
