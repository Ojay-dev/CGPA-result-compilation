import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    accountType: {
        type: Number,
        required: true,
        default: 1,
    },
    id_num: String,
    name: {
        type: String,
        required: true,
        min: 5
    },
    department: {
        type: String,
    },
    year_of_entry: {
        type: String,
        min: 9,
    },
    level: String,
});

// middleware that will run before a document
// is created

userSchema.pre('save', function (next) {

    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});  
  
userSchema.methods = {
    // check the passwords on signin
    authenticate: function (plainTextPword) { return bcrypt.compareSync(plainTextPword, this.password) },
    // hash the passwords
    encryptPassword: (plainTextPword) => {
        if (!plainTextPword) {
        return ''
        } else {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainTextPword, salt);
        }
    }
    };

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;