const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    group: {
        type: Number,
        required: true
    },
    role: {
        type: String
    }
});

//Hash password
userSchema.pre('save', function (next) {
   if (!this.isModified('password')) {
       return next();
   } 

   bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        });
   });
});

module.exports = mongoose.model('User', userSchema); 