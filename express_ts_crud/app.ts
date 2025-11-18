const express  = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
import { db_connect } from './config/db';
import { router } from './routes/user.route';

dotenv.config()
db_connect()

const app = express()
const PORT = process.env.PORT || 4040
app.use(cors())
app.use(express.json())
app.use("/api/v1/user",router)

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})