const express=require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();


/*allow to make cross origin requests*/
app.use(cors());
/*Allow us to pass json payload from frontend to backend */
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.send('Hello, world');
})

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
