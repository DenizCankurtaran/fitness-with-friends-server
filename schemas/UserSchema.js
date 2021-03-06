const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 2, maxlength: 64 },
    password: { type: String, required: true, minlength: 5, maxlength: 255 },
    isAdmin: { type: Boolean, default: false },
    friends: { type: [String], default: [] },
    level: { type: Number, default: 0 },
    amount: { type: Number, default: 5 },
    theme: { type: Number, default: 0 },
    machines: { type: [String], default: [] },
    currentStreak: { type: Number, default: 0 },
    highestStreak: { type: Number, default: 0 }
    
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, 10).then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    });
});

UserSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.password) {
        
        bcrypt.hash(this._update.password, 10).then((hashedPassword) => {
            this._update.password = hashedPassword;
            next();
        });
    } else {
        next();
    }
});

UserSchema.methods.checkPassword = function (password, next) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return next(err);
        next(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User
