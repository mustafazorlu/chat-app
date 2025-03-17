const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");

const app = express();
//dotenv dosyaları
dotenv.config();
//veritabanı bağlantısı
connectDB();
//sunucumuza json verisinde işlemler için
app.use(express.json());

app.get("/", (req, res) => {
    res.send("api is running");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

// app.use(notfo)

// app.get("/api/chat", (req, res) => {
//     res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//     const singleChat = chats.find((chat) => chat._id === req.params.id);
//     res.send(singleChat);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server has started on port ${PORT}`.yellow.bold));
