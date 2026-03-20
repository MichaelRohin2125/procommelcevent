import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pathToFileURL } from 'url';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

// ─── MySQL Connection Pool ──────────────────────────────────────────
let pool;
let dbReady = false;

async function createPool() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'procomm_literary',
    waitForConnections: true,
    connectionLimit: 10,
  });
}

// ─── Initialize Database Tables ─────────────────────────────────────
export async function initDB() {
  try {
    // Create database if it doesn't exist
    const tempConn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'procomm_literary'}\``);
    await tempConn.end();

    // Now create the pool with the database
    await createPool();

    // Create registrations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        team_name VARCHAR(255) NOT NULL,
        college_name VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        team_lead_name VARCHAR(255) NOT NULL,
        team_lead_email VARCHAR(255) NOT NULL,
        team_lead_phone VARCHAR(20) NOT NULL,
        team_size INT NOT NULL DEFAULT 1,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create team_members table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        registration_id INT NOT NULL,
        member_name VARCHAR(255) NOT NULL,
        member_email VARCHAR(255) NOT NULL,
        member_phone VARCHAR(20) NOT NULL,
        FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
      )
    `);

    dbReady = true;
    console.log('✅ Database tables initialized successfully');
  } catch (err) {
    console.error('');
    console.error('❌ DATABASE CONNECTION FAILED!');
    console.error('   Error:', err.message);
    console.error('');
    console.error('   Fix: Open server/.env and set your MySQL password:');
    console.error('   DB_PASSWORD=your_actual_mysql_root_password');
    console.error('');
    console.error('   Also make sure MySQL service is running.');
    console.error('');
  }
}

// ─── Middleware: Check DB Ready ────────────────────────────────────
function checkDB(req, res, next) {
  if (!dbReady || !pool) {
    return res.status(503).json({ 
      error: 'Database not connected. Check server/.env file — make sure DB_PASSWORD is your actual MySQL password and MySQL is running.' 
    });
  }
  next();
}

// ─── Middleware: Verify JWT Token ───────────────────────────────────
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ROUTES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── Health Check ───────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ 
    server: 'running', 
    database: dbReady ? 'connected' : 'NOT connected — check .env',
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'root',
    dbName: process.env.DB_NAME || 'procomm_literary',
  });
});

// ─── POST /api/register ─ Submit a registration ─────────────────────
app.post('/api/register', checkDB, async (req, res) => {
  try {
    const {
      eventId, eventName, teamName, collegeName,
      department, branch, teamLeadName, teamLeadEmail,
      teamLeadPhone, teamSize, members
    } = req.body;

    // Validate required fields
    if (!eventId || !teamName || !teamLeadName || !teamLeadPhone) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Insert into registrations table
    const [result] = await pool.query(
      `INSERT INTO registrations 
        (event_id, event_name, team_name, college_name, department, branch, 
         team_lead_name, team_lead_email, team_lead_phone, team_size)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [eventId, eventName || '', teamName, collegeName || '', department || '', 
       branch || '', teamLeadName, teamLeadEmail || '', teamLeadPhone, teamSize || 1]
    );

    const registrationId = result.insertId;

    // Insert team members if any
    if (members && members.length > 0) {
      for (const member of members) {
        if (member.name) {
          await pool.query(
            `INSERT INTO team_members (registration_id, member_name, member_email, member_phone) 
             VALUES (?, ?, ?, ?)`,
            [registrationId, member.name, member.email || '', member.phone || '']
          );
        }
      }
    }

    console.log(`✅ New registration: "${teamName}" for "${eventName}" (ID: ${registrationId})`);

    res.status(201).json({ 
      message: 'Registration successful!', 
      registrationId 
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Server error during registration: ' + err.message });
  }
});

// ─── POST /api/admin/login ─ Admin Login ────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token, message: 'Access Granted.' });
  }

  return res.status(401).json({ error: 'Invalid password. Access Denied.' });
});

// ─── GET /api/admin/registrations ─ Get all registrations (protected) 
app.get('/api/admin/registrations', authenticateToken, checkDB, async (req, res) => {
  try {
    const [registrations] = await pool.query(
      `SELECT * FROM registrations ORDER BY registered_at DESC`
    );

    // Fetch members for each registration
    for (const reg of registrations) {
      const [members] = await pool.query(
        `SELECT * FROM team_members WHERE registration_id = ?`,
        [reg.id]
      );
      reg.members = members;
    }

    res.json(registrations);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch registrations.' });
  }
});

// ─── GET /api/admin/stats ─ Get dashboard stats (protected) ─────────
app.get('/api/admin/stats', authenticateToken, checkDB, async (req, res) => {
  try {
    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM registrations');
    const [eventCounts] = await pool.query(
      `SELECT event_name, COUNT(*) as count FROM registrations GROUP BY event_name ORDER BY count DESC`
    );
    const [[{ totalMembers }]] = await pool.query(
      `SELECT COALESCE(SUM(team_size), 0) as totalMembers FROM registrations`
    );

    res.json({
      totalRegistrations: total,
      totalParticipants: totalMembers,
      eventBreakdown: eventCounts,
    });
  } catch (err) {
    console.error('Stats error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
});

// ─── GET /api/admin/export/csv ─ Download all registrations as CSV ──
app.get('/api/admin/export/csv', authenticateToken, checkDB, async (req, res) => {
  try {
    const [registrations] = await pool.query(
      `SELECT * FROM registrations ORDER BY registered_at DESC`
    );

    // Fetch members for each registration
    for (const reg of registrations) {
      const [members] = await pool.query(
        `SELECT * FROM team_members WHERE registration_id = ?`,
        [reg.id]
      );
      reg.members = members;
    }

    // CSV Headers
    const headers = [
      'S.No', 'Event Name', 'Team Name', 'College Name', 'Department', 'Branch/Year',
      'Team Lead Name', 'Team Lead Email', 'Team Lead Phone', 'Team Size',
      'Member 2 Name', 'Member 2 Email', 'Member 2 Phone',
      'Member 3 Name', 'Member 3 Email', 'Member 3 Phone',
      'Member 4 Name', 'Member 4 Email', 'Member 4 Phone',
      'Registered At'
    ];

    // Helper to escape CSV values
    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };

    // Build CSV rows
    const rows = registrations.map((reg, idx) => {
      const members = reg.members || [];
      const row = [
        idx + 1,
        reg.event_name,
        reg.team_name,
        reg.college_name,
        reg.department,
        reg.branch,
        reg.team_lead_name,
        reg.team_lead_email,
        reg.team_lead_phone,
        reg.team_size,
        members[0]?.member_name || '',
        members[0]?.member_email || '',
        members[0]?.member_phone || '',
        members[1]?.member_name || '',
        members[1]?.member_email || '',
        members[1]?.member_phone || '',
        members[2]?.member_name || '',
        members[2]?.member_email || '',
        members[2]?.member_phone || '',
        new Date(reg.registered_at).toLocaleString('en-IN', { 
          day: '2-digit', month: 'short', year: 'numeric', 
          hour: '2-digit', minute: '2-digit' 
        }),
      ];
      return row.map(escapeCSV).join(',');
    });

    // UTF-8 BOM for proper Excel display
    const BOM = '\uFEFF';
    const csv = BOM + headers.join(',') + '\n' + rows.join('\n');

    const timestamp = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="registrations_${timestamp}.csv"`);
    res.send(csv);

    console.log(`📥 CSV exported: ${registrations.length} registrations`);
  } catch (err) {
    console.error('CSV export error:', err.message);
    res.status(500).json({ error: 'Failed to export CSV.' });
  }
});

// ─── DELETE /api/admin/registrations/:id ─ Delete a registration ────
app.delete('/api/admin/registrations/:id', authenticateToken, checkDB, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM registrations WHERE id = ?', [id]);
    res.json({ message: 'Registration deleted successfully.' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete registration.' });
  }
});

// ─── Start Server (Only When Run Directly) ─────────────────────────
const isDirectExecution = process.argv[1]
  ? import.meta.url === pathToFileURL(process.argv[1]).href
  : false;

if (isDirectExecution) {
  const PORT = process.env.PORT || 5000;

  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`\n🔥 Hawkins Lab Server running on http://localhost:${PORT}`);
      console.log(`   Health check: GET  http://localhost:${PORT}/api/health`);
      console.log(`   Admin login:  POST /api/admin/login`);
      console.log(`   Register:     POST /api/register`);
      console.log(`   View data:    GET  /api/admin/registrations\n`);
      if (!dbReady) {
        console.log('⚠️  WARNING: Server started but database is NOT connected!');
        console.log('   Edit server/.env and set DB_PASSWORD to your MySQL password.\n');
      }
    });
  });
}

