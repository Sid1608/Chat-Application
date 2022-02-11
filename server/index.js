const express=require('express');
const cors = require('cors');

const authRoutes=require('./routes/auth.js')
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid=process.env.TWILIO_Messaging_Service_Sid
const twilioClient=require('twilio')(accountSid,authToken);

/*allow to make cross origin requests*/
app.use(cors());
/*Allow us to pass json payload from frontend to backend */
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.send('Hello, world');
})
app.post('/',(req,res)=>{
    const {message,user:sender,type,members}=req.body;
    if(type==='message.new'){
        members
            .filter((member)=>member.user_id!=sender.id)
            .foreach(({user})=>{
                if(!user.online){
                    twilioClient.messages.create({
                        body:`You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid:messagingServiceSid,
                        to:user.phoneNumber
                    })
                        .then(()=>console.log('Message sent!'))
                        .catch((err)=>console.log(err));
                }
            })
            return res.status(200).send('Message sent!');
    }
    return res.status(200).send('Not a new Message req!');
})
app.use('/auth',authRoutes)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
