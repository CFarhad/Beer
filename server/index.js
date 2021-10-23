const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

app.get('/download',(req,res)=>{
  const file = `./note.pdf`;
  res.download(file)
})

app.listen(8080);