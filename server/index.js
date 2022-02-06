const express=require('express');
const cors = require('cors');

const authRoutes=require('./routes/auth.js')
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

app.use('/auth',authRoutes)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
