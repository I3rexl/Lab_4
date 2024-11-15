const express= require('express');

const app= express();

const port= 3000;

app.listen(port, () => {
    console.log('Server dang chay o cong: ' + port);
    
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})

const multer= require('multer');

const storage= multer.diskStorage({
    destination: function (req, file, cb) {

        var dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        let fileName = file.originalname;
        let newFileName = fileName;
        // arr = fileName.split('.');

        // let newFileName = '';

        // for (let i =0; i< arr.length; i++) {
        //     if (i != arr.length - 1) {
        //         newFileName += arr[i];
        //     } else {
        //         newFileName += ('-' + Date.now() + '.' + arr[i]);
        //     }
        // }

        cb(null, newFileName)
    }
})

const fs= require('fs');
const upload= multer({storage: storage});

app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    let file= req.file;
    if(!file){
        var error= new Error('Can chon file !');
        error.httpStatusCode= 400;
        return next(error);
    }

    //luu lai path cua file da upload len server (vao mongoDB) de su dung sau
    let pathFileInServer= file.path;
    console.log(pathFileInServer);

    //http://192.168.0.8:3000/uploads\snow-ball.png
    

    res.send(file);

    
})
