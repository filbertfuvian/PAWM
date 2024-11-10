const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Register user
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err.message);
      return res.status(500).json({ error: 'Error hashing password' });
    }

    // Insert user data ke database
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Database error:', err.message);  // Log error SQL
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};


// Login user
exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(400).json({ message: 'User not found' });

      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
      });
    }
  );
};
