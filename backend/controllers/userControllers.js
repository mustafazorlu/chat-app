const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
    //requestten body den verilerimizi alıyoruz
    const { name, email, password, pic } = req.body;
    //name email password yoksa bir hata dönüyoruz
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }
    //kullanıcı için eşsiz olan değeri buluyor
    const userExists = await User.findOne({ email });

    //eğer bulursa bu kullanıcı zaten mevcut hatası dönüyor
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    //burada yeni bir kullanıcı oluşturuyoruz
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    //kullanıcı oluşursa bize bir cevap dönüyor
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        //oluşmazsa hata
        res.status(400);
        throw new Error("User not found");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        //oluşmazsa hata
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, authUser };
