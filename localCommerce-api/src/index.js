const express = require('express');
const cors = require('cors');
const commerceRouter = require('./routers/commerce');
const userRouter = require('./routers/user');
require('./db/mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(commerceRouter);
app.use(userRouter);

app.listen(3000, () => {
    console.log('\nApp is running on port 3000')
})