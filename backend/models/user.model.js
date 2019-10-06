const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const salt_work_factor = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    friends: [{
        id: {
            type: Schema.ObjectId
        }        
    }]
});

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {

        bcrypt.genSalt(salt_work_factor, (err, salt) => {
            if (err) console.log('err1');
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) console.log('err2');
                user.password = hash;
                console.log('pre',user);
                next();
            })
        })

    } else {
        next();
    }

});

userSchema.methods.validPassword = function (password) {
    let user = this;

    return new Promise((resolve, reject)=>{bcrypt.compare(password, user.password, (err, result)=> {
        console.log(result);
        resolve(result);
    })})
};

const User = mongoose.model('User', userSchema);

module.exports = User;