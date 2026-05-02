const User = require('../models/User');
const { signToken } = require('../utils/jwt');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Body: { name, email, password, role }
// ─────────────────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required.',
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered. Please log in.',
      });
    }

    // Password is hashed by the pre-save hook in the User model
    const user = await User.create({
      name:         name.trim(),
      email:        email.toLowerCase().trim(),
      password,
      role:         role || 'consumer',
      authProvider: 'email',
      isVerified:   true,
    });

    const token = signToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
// ─────────────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email. Please register first.',
      });
    }

    // Google-only accounts won't have a password
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'This account was created with Google. Please use "Continue with Google".',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please try again.',
      });
    }

    const token = signToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/google
// Body: { name, email, googleId, photoURL, role }
// Upserts a Google OAuth user and returns a JWT
// ─────────────────────────────────────────────────────────────────────────────
const googleAuth = async (req, res) => {
  try {
    const { name, email, googleId, photoURL, role } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({
        success: false,
        message: 'Email and Google ID are required.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    if (user) {
      // Link Google ID if the user previously registered with email/password
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        if (photoURL) user.profilePic = photoURL;
        await user.save();
      }
    } else {
      // Brand-new Google user
      user = await User.create({
        name:         name || normalizedEmail.split('@')[0],
        email:        normalizedEmail,
        googleId,
        profilePic:   photoURL || '',
        role:         role || 'consumer',
        authProvider: 'google',
        isVerified:   true,
      });
    }

    const token = signToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.name}!`,
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error('googleAuth error:', err);
    return res.status(500).json({ success: false, message: 'Server error during Google auth.' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/logout  (stateless JWT — just a client-side signal)
// ─────────────────────────────────────────────────────────────────────────────
const logout = (_req, res) =>
  res.status(200).json({ success: true, message: 'Logged out successfully.' });

module.exports = { register, login, googleAuth, logout };
