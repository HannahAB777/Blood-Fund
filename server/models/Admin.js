const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Result = require('./Result');

function validateLicense(){

}

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  medicalLicenseNumber:{
    type     : String,
    required : true,
    unique   : true,
    //validate : {
    //  //medical number api or secret password
    //}
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  results: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Result',
    },
  ],
},
{
  toJSON: {
    virtuals: true,
    timestamps: true
  }
});

// set up pre-save middleware to create password
adminSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
adminSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model('User', adminSchema);

module.exports = Admin;
