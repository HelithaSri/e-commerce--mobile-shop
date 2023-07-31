const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import routes
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// MongoDB Atlas connection string
const MONGODB_URI =
    "mongodb+srv://helitha:akns4ever@commerce.esb29dn.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const port = 3000;

// Routes
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
