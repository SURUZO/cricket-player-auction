const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'cpms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  namedPlaceholders: true,
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL connected');
});

// Middleware for handling errors
const handleErrors = (res, error, message = 'Internal server error') => {
  console.error(error.message);
  res.status(500).json({ success: false, message });
};

app.get('/bid/check', async (req, res) => {
  const playerId = req.query.player_id;

  try {
    const [existingBid] = await db.promise().query('SELECT * FROM bid WHERE player_id = ?', [playerId]);

    res.json({ exists: existingBid.length > 0 });
  } catch (error) {
    handleErrors(res, error);
  }
});

app.post('/bid', async (req, res) => {
  const { player_id, recruiter_id, bid_amount } = req.body;

  try {
    const [existingBid] = await db.promise().query('SELECT * FROM bid WHERE player_id = ?', [player_id]);

    if (existingBid.length > 0) {
      res.json({ success: false, message: 'Player already has an existing bid' });
      return;
    }

    await db.promise().query('INSERT INTO bid (player_id, recruiter_id, bid_amount) VALUES (?, ?, ?)', [
      player_id,
      recruiter_id,
      bid_amount,
    ]);

    res.json({ success: true, message: 'Bid added successfully' });
  } catch (error) {
    handleErrors(res, error, 'Error adding bid');
  }
});

app.get('/playerbids', async (req, res) => {
  try {
    const [playerBids] = await db
      .promise()
      .query(
        'SELECT bid.bid_id, bid.player_id, bid.bid_amount, players.name AS player_name, recruiters.username AS recruiter_name FROM bid JOIN players ON bid.player_id = players.id JOIN recruiters ON bid.recruiter_id = recruiters.id'
      );

    res.json({ success: true, playerBids });
  } catch (error) {
    handleErrors(res, error, 'Error fetching player bids');
  }
});

app.post('/playerbids/increase', async (req, res) => {
  const { playerId, bidAmount, recruiterId } = req.body; // Assuming recruiterId is sent from AuthContext

  try {
    const [currentBid] = await db.promise().query('SELECT * FROM bid WHERE player_id = ?', [playerId]);

    if (currentBid.length === 0) {
      res.json({ success: false, message: 'Bid not found for the player' });
      return;
    }

    const currentBidAmount = currentBid[0].bid_amount;

    if (bidAmount > currentBidAmount) {
      await db
        .promise()
        .query('UPDATE bid SET bid_amount = ?, recruiter_id = ? WHERE player_id = ?', [bidAmount, recruiterId, playerId]);

      res.json({ success: true, message: 'Bid increased successfully' });
    } else {
      res.json({ success: false, message: 'New bid amount must be greater than the current bid' });
    }
  } catch (error) {
    handleErrors(res, error, 'Error increasing bid');
  }
});

app.get('/player/:id', async (req, res) => {
  const playerId = req.params.id;

  try {
    const [player] = await db.promise().query('SELECT * FROM players WHERE id = ?', [playerId]);

    if (player.length > 0) {
      res.json({ player: player[0] });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    handleErrors(res, error, 'Error fetching player data');
  }
});

app.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const query = `SELECT id, username FROM ${role === 'Recruiter' ? 'recruiters' : 'academy'} WHERE username = ? AND password = ?`;
    const [user] = await db.promise().query(query, [username, password]);

    if (user.length > 0) {
      const { id, username } = user[0];
      res.json({ success: true, message: 'Login successful', user: { id, username } });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    handleErrors(res, error, 'Login error');
  }
});

app.post('/filter', async (req, res) => {
  const { playerType, selectedSubCategories, queryParams } = req.body;
  const conditions = [];

  try {
    let query = `SELECT p.id, p.name, academy.username as academy_name, p.player_type as role 
             FROM players p
             JOIN academy ON p.academy_id = academy.id
             WHERE (p.player_type = ? OR p.player_type = 'All-Rounder')`;

    selectedSubCategories.forEach((subCategory) => {
      conditions.push(generateCondition(subCategory));
    });

    if (conditions.length > 0) {
      query += ` AND ${conditions.join(' AND ')}`;
    }

    const [players] = await db.promise().query(query, [playerType, ...queryParams]);

    console.log('Final Query:', db.format(query, [playerType, ...queryParams]));

    res.json({ success: true, players });
  } catch (error) {
    handleErrors(res, error, 'Filter error');
  }
});

app.get('/getPlayerStats', async (req, res) => {
  const academyId = req.query.academyId;

  try {
    const [playerStats] = await db
      .promise()
      .query(
        'SELECT players.id, players.name, players.player_type, players.strike_rate, players.centuries, players.half_centuries, players.consistency, players.ability_to_play_spin_pace, players.match_winning_innings, players.economy_rate, players.variety_of_deliveries, players.wicket_taking_ability, players.catches, players.run_outs, players.stumpings, players.height, players.weight, players.fitness_level, players.personal_statement, players.photos, players.videos, players.email, players.phone_number, players.social_media_profiles, players.notable_innings, players.best_bowling_figures, players.awards, players.batting_style, players.bowling_style, players.strengths, players.weaknesses, players.date_of_birth, players.profile_photo FROM players JOIN academy ON players.academy_id = academy.id WHERE academy.id = ?',
        [academyId]
      );

    res.json({ success: true, playerStats });
  } catch (error) {
    handleErrors(res, error, 'Error fetching player stats');
  }
});

function generateCondition(subCategory) {
  const subCategoryValue = subCategory.value || subCategory.subCategory;

  const columnNames = {
    battingaverage: 'batting_average',
    strikerate: 'strike_rate',
    consistency: 'consistency',
    abilitytoplayspinpace: 'ability_to_play_spin_pace',
    economyrate: 'economy_rate',
    varietyofdeliveries: 'variety_of_deliveries',
    wickettakingability: 'wicket_taking_ability',
    centuries: 'centuries',
    halfcenturies: 'half_centuries',
    matchwinninginnings: 'match_winning_innings',
    catches: 'catches',
    runouts: 'run_outs',
    stumpings: 'stumpings',
  };

  const normalizedSubCategory = columnNames[subCategoryValue.toLowerCase()];

  if (normalizedSubCategory) {
    return `${normalizedSubCategory} >= ?`;
  } else {
    return '1';
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

