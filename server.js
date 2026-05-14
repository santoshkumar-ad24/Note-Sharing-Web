const express = require('express');
const app = express();
const fs =require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req,res)=>{
    res.render('index')
})

const files = path.join(__dirname, 'files');

app.post('/:title/', (req, res) => {
    const title = req.params.title;
    const filePath = path.join(files, `${title}.txt`);
    let content = "";

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
    } else {
        content = fs.readFileSync(filePath, 'utf-8');
    }
    // Changed view name to match your prompt "writeNote.ejs"
    res.render("writeNote", { title: title, data: content });
});

app.post('/api/save/:title', (req, res) => {
    const title = req.params.title;
    const content = req.body.content;
    const filePath = path.join(files, `${title}.txt`);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Save failed" });
        }
        res.json({ success: true, message: "Saved successfully" });
    });
});





app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 Access it at: http://127.0.0.1:${PORT}`);
});
