const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Import database functions
const { connectDB, getNote, saveNote, closeDB } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy')
})

app.get('/disclaimer', (req, res) => {
    res.render('disclaimer')
})

app.post('/:title/', async (req, res) => {
    try {
        const title = req.params.title;
        const content = await getNote(title);
        res.render("writeNote", { title: title, data: content });
    } catch (error) {
        console.error('Error loading note:', error);
        res.status(500).send('Error loading note');
    }
});

app.post('/api/save/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const content = req.body.content;
        
        await saveNote(title, content);
        res.json({ success: true, message: "Saved successfully" });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ success: false, message: "Save failed" });
    }
});


app.listen(PORT, async () => {
    await connectDB();
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 Access it at: http://127.0.0.1:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await closeDB();
    process.exit(0);
});
