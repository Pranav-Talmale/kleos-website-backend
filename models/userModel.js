const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },

    member1Name: {
      type: String,
      required: true,
    },
    member1Email: {
      type: String,
      required: true,
      unique: true,
    },
    member1Number: {
      type: Number,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    paymentComplete: {
      type: Boolean,
      default: false,
      unique: false,
      sparse: true,
    },

    signType: {

      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

userSchema.add({
  shortTeamName: {
    type: String,
  },
  teamName: {
    type: String,
    unique: true,
    sparse: true,
  },

  member2Name: {
    type: String,
  },
  member2Email: {
    type: String,
    unique: true,
    sparse: true,
  },
  member2Number: {
    type: Number,
    unique: true,
    sparse: true,
  },

  member3Name: {
    type: String,
  },
  member3Email: {
    type: String,
    unique: true,
    sparse: true,
  },
  member3Number: {
    type: Number,
    unique: true,
    sparse: true,
  },

  member4Name: {
    type: String,
  },
  member4Email: {
    type: String,
    unique: true,
    sparse: true,
  },
  member4Number: {
    type: Number,
    unique: true,
    sparse: true,
  },

  razorpay_order_id: {
    type: String,
    sparse: true,
  },
  razorpay_payment_id: {
    type: String,
    sparse: true,
  },
  razorpay_signature: {
    type: String,
    sparse: true,
  },
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
