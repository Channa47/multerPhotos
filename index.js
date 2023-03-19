const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors')
const app = express();
app.use(cors({origin:"*"}))
// connect to MongoDB Atlas
mongoose.connect('mongodb+srv://channa:channa@cluster0.g3ghjv3.mongodb.net/mockthirteen?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create a schema for storing file data
const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  data: Buffer,
});
// "cors": "^2.8.5",
//     "express": "^4.18.2",
//     "mongoose": "^7.0.2",
//     "multer": "^1.4.5-lts.1",
//     "nodemon": "^2.0.21"

const File = mongoose.model('ChatGtpImages', fileSchema);

// configure multer middleware to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

// define a route for uploading files
app.post('/uploadImages', upload.single('file'), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const file = new File({
      name: originalname,
      type: mimetype,
      size: buffer.length,
      data: buffer,
    });
    await file.save();
    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/',async(req,res)=>{
    try{
    let Data = await File.find();
    res.send(Data);
    }catch(e){
   console.log(e);
   res.send({msg:"error"})
    }
})

// start the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
