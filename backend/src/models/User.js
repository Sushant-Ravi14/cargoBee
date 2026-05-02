const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const savedAddressSchema = new mongoose.Schema({
  label: { type: String, enum: ['home', 'office', 'other'], default: 'other' },
  address: { type: String, required: true },
  coordinates: { lat: Number, lng: Number },
});

const walletTransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, trim: true, lowercase: true },

    // Hashed password — not required for Google-only users
    password: { type: String },

    role:       { type: String, enum: ['consumer', 'driver'], default: 'consumer' },
    profilePic: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },

    // Google OAuth
    googleId:     { type: String },
    authProvider: { type: String, enum: ['email', 'google'], default: 'email' },

    // Consumer-specific
    walletBalance:      { type: Number, default: 0 },
    walletTransactions: [walletTransactionSchema],
    savedAddresses:     [savedAddressSchema],

    // Driver-specific
    vehicleId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    isOnline:        { type: Boolean, default: false },
    currentLocation: { lat: Number, lng: Number },
    rating:          { type: Number, default: 5.0 },
    totalTrips:      { type: Number, default: 0 },
    totalEarnings:   { type: Number, default: 0 },
    licenseNumber:   { type: String },
    licenseDoc:      { type: String },
    vehicleNo:       { type: String },

    // Profile addresses
    homeAddress:     { type: String, default: '' },
    officeAddress:   { type: String, default: '' },
  },
  { timestamps: true }
);

// Hash password before saving (only when it's modified)
// Note: Mongoose 7+ resolves async middleware via Promises — no `next` needed
userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare plain-text password with stored hash
userSchema.methods.comparePassword = async function (candidate) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

// Strip sensitive fields from API responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
