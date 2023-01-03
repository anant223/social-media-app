// getting-started.js
const mongoose = require('mongoose');

main().then(()=>{console.log("Connected to Database: MongoDB")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/codeial_development');
  
}

