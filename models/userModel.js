import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    shortTeamName: {
        type: String,
    },
    teamName: {
        type: String,
    },

    state:{
        type: String,
        required: true
    },

    member1Name: {
        type: String,
        required: true
    },
    member1Email: {
        type: String,
        required: true,
        unique: true
    },
    member1Number: {
        type: Number,
        required: true,
        unique: true
    },

    member2Name: {
        type: String,
    },
    member2Email: {
        type: String,
        unique: true
    },
    member2Number: {
        type: Number,
        unique: true
    },

    member3Name: {
        type: String,
    },
    member3Email: {
        type: String,
        unique: true
    },
    member3Number: {
        type: Number,
        unique: true
    },

    member4Name: {
        type: String,
    },
    member4Email: {
        type: String,
        unique: true
    },
    member4Number: {
        type: Number,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;