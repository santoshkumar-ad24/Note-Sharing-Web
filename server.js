const express = require('express');
const app = express();
const fs =require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
let data;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.use(express.static('./frontend'));

app.get('/', (req,res)=>{
    res.render('index')
})



app.post('/:title/', (req,res)=>{
    const title = req.params.title
    if(!fs.existsSync(path.join('./files', `${title}.txt`))){
        fs.writeFileSync(`./files/${title}.txt`,'');
    }
    else{
        data = fs.readFileSync(path.join('./files', `${title}.txt`), 'utf-8')
    }
    res.render("writeNote", {title:title, data:data})
})

app.post('/:title/notes', (req,res)=>{
    const titles = req.params.title
    if(fs.existsSync(path.join('./files', `${titles}.txt`))){
            fs.writeFileSync(path.join('./files', `${titles}.txt`), req.body.content)

    }
    res.redirect('/')
})





app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 Access it at: http://127.0.0.1:${PORT}`);
});
