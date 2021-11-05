const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

app.get('/',(req,res)=>{
  const file = `./server/note.pdf`;
  res.download(file)
})

app.listen(8080);