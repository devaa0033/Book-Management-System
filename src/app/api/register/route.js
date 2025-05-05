export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, address, role } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  try {
    
    const [existingUser] = await promisePool.query(
      'SELECT id FROM account_holders WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    
    const [result] = await promisePool.query(
      `INSERT INTO account_holders (name, email, phone, address, role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone || null, address || null, role || 'user']
    );

    return res.status(201).json({
      message: 'User registered successfully.',
      userId: result.insertId
    });
  } catch (error) {
    console.error(' Registration error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
