const mongoose = require('mongoose')

//configure database and mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database is connected");
})
.catch(err => {
    console.log({ database_error: err });
});