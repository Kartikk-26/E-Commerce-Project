const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [40, 'Name cannot exceed 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (val) {
                if (typeof val !== 'string' || val.trim().length === 0) {
                    return false;
                }
                return validator.isStrongPassword(val, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                });
            },
            message: props => `'${props.value}' is not strong enough. Password must have at least 8 characters, including 1 lowercase, 1 uppercase, 1 number, and 1 symbol.`
        }
    },
    role : {
        type : String,
        enum : ['admin', 'user'],
        default : 'user'
    }
});


//Hash the password
userSchema.pre('save', async function(next) {
    //if password is not modified we dont need to hash the password again
    if(!this.isModified('password')) next()
        //hash the password
    this.password = await bcrypt.hash(this.password,12)
    next()
})


const User = mongoose.model('User', userSchema);

module.exports = User;
