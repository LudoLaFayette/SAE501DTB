const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); // for parsing JSON requests
const cors = require('cors');

const app = express();
const port = 5000; // Change this to your desired port

app.use(cors());

// Middleware for parsing JSON requests
app.use(bodyParser.json());


// Connect to your SQLite database
const db = new sqlite3.Database('./database/watchesDB.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});
const jwt = require('jsonwebtoken');
const secretKey = 'VotreCléSecrète'; // Utilisez une clé secrète plus sécurisée
const session = require('express-session');
app.use(session({
    secret: 'VotreCléSecrète',
    resave: false,
    saveUninitialized: true
}));
// Define the API endpoints
// Redirect the home to all recipes
app.get('/', (req, res) => {
    res.redirect('/watches');
});

// Define a route for help and contact
// app.get('/help-contact', (req, res) => {
//     // The HTML file will be served automatically from the 'public' directory
//     res.sendFile(__dirname + '/help-contact.html');
// });

//Get all recipes
app.get('/watches', (req, res) => {
    db.all('SELECT * FROM Watches', (err, rows) => {
        if (err) {
            console.error('Error fetching watches:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); // Return the list of recipes as JSON response
    });
});
// app.get('/cadran', (req, res) => {
//   db.all('SELECT * FROM Cadran', (err, rows) => {
//       if (err) {
//           console.error('Error fetching cadran:', err.message);
//           res.status(500).json({ error: 'Internal server error' });
//           return;
//       }
//       res.json(rows); // Return the list of recipes as JSON response
//   });
// });
app.get('/boitiers', (req, res) => {
  db.all('SELECT * FROM Boitiers', (err, rows) => {
      if (err) {
          console.error('Error fetching boitiers:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(rows); // Return the list of recipes as JSON response
  });
});
app.get('/bracelet', (req, res) => {
  db.all('SELECT * FROM Bracelet', (err, rows) => {
      if (err) {
          console.error('Error fetching bracelet:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(rows); // Return the list of recipes as JSON response
  });
});
app.get('/utilisateur', (req, res) => {
  db.all('SELECT * FROM Utilisateur', (err, rows) => {
      if (err) {
          console.error('Error fetching utilisateur:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(rows); // Return the list of recipes as JSON response
  });
});
app.get('/pierres', (req, res) => {
  db.all('SELECT * FROM Pierres', (err, rows) => {
      if (err) {
          console.error('Error fetching pierres:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(rows); // Return the list of recipes as JSON response
  });
});
app.post('/signup', (req, res) => {
  const { utilisateur_email, utilisateur_name, utilisateur_mdp } = req.body;

  // Valider les données d'inscription ici...

  // Hacher le mot de passe
  bcrypt.hash(utilisateur_mdp, 10, (err, hash) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }

      // Enregistrer le nouvel utilisateur dans la base de données
      const query = `INSERT INTO Utilisateur (utilisateur_email, utilisateur_name, utilisateur_mdp) VALUES (?, ?, ?)`;
      db.run(query, [utilisateur_email, utilisateur_name, hash], (err) => {
          if (err) {
              res.status(500).json({ error: err.message });
              return;
          }
          res.json({ message: 'User registered successfully' });
      });
  });
});
// app.post('/signup', (req, res) => {
//   const { email, username, password } = req.body;
//   const query = `INSERT INTO Utilisateur (utilisateur_email, utilisateur_name, utilisateur_mdp) VALUES (?, ?, ?)`;
//   db.run(query, [email, username, password], (err) => {
//       if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//       }
//       res.json({ message: 'User registered successfully' });
//   });
// });
//Connxion ? :
app.post('/login', (req, res) => {
  const { utilisateur_email, utilisateur_mdp } = req.body;

  // Vérifiez si l'utilisateur avec les informations de connexion fournies existe dans la base de données
  db.get('SELECT * FROM Utilisateur WHERE utilisateur_email = ? AND utilisateur_mdp = ?', [utilisateur_email, utilisateur_mdp], (err, utilisateur) => {
      if (err) {
          console.error('Error checking user login:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }

      if (utilisateur) {
          // Générer un JWT pour l'utilisateur authentifié
          const token = jwt.sign({ userId: utilisateur.utilisateur_id }, secretKey, { expiresIn: '1h' });

          // L'utilisateur est authentifié avec succès
          res.json({ message: 'Login successful', token, utilisateur_id: utilisateur.utilisateur_id, utilisateur_name: utilisateur.utilisateur_name });
      } else {
          // L'authentification a échoué
          res.status(401).json({ error: 'Invalid credentials' });
      }
  });
});
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};
app.get('/protected-route', authenticateToken, (req, res) => {
  // Seul un utilisateur authentifié peut accéder à cette route
});


// app.post('/login', (req, res) => {
//   const { utilisateur_email, utilisateur_mdp } = req.body;

//   // Vérifiez si l'utilisateur avec les informations de connexion fournies existe dans la base de données
//   db.get('SELECT * FROM Utilisateur WHERE utilisateur_email = ? AND utilisateur_mdp = ?', [utilisateur_email, utilisateur_mdp], (err, utilisateur) => {
//       if (err) {
//           console.error('Error checking user login:', err.message);
//           res.status(500).json({ error: 'Internal server error' });
//           return;
//       }

//       if (utilisateur) {
//           // L'utilisateur est authentifié avec succès
//           res.json({ message: 'Login successful', utilisateur_id: utilisateur.utilisateur_id, utilisateur_name: utilisateur.utilisateur_name });
//       } else {
//           // L'authentification a échoué
//           res.status(401).json({ error: 'Invalid credentials' });
//       };
//       req.session.utilisateur_id = admin01 ;
//   res.json({ message: 'Connecté avec succès' });
//   });
// });
// app.get('/logout', (req, res) => {
//   // Déconnectez l'utilisateur en détruisant sa session
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Erreur lors de la déconnexion :', err.message);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.json({ message: 'Déconnecté avec succès' });
//   });
// });
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Logout successful' });
  });
});
//////////////////////////////////////////////////USERS////////////////////////
///ADD users
app.post('/api/utilisateurs', (req, res) => {
  const { utilisateur_email, utilisateur_name, utilisateur_mdp } = req.body;
  const sql = `INSERT INTO Utilisateur (utilisateur_email, utilisateur_name, utilisateur_mdp) VALUES (?, ?, ?)`;
  db.run(sql, [utilisateur_email, utilisateur_name, utilisateur_mdp], function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.status(201).json({ "utilisateur_id": this.lastID });
  });
});

//Infos users
app.get('/api/utilisateurs/:id', (req, res) => {
  const sql = `SELECT * FROM Utilisateur WHERE utilisateur_id = ?`;
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": row
    });
  });
});

/// MAj user
app.put('/api/utilisateurs/:id', (req, res) => {
  const { utilisateur_email, utilisateur_name, utilisateur_mdp } = req.body;
  const sql = `
    UPDATE Utilisateur 
    SET utilisateur_email = ?, utilisateur_name = ?, utilisateur_mdp = ? 
    WHERE utilisateur_id = ?
  `;
  const params = [utilisateur_email, utilisateur_name, utilisateur_mdp, req.params.id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      message: "success",
      changes: this.changes
    });
  });
});

//Supprimer user
app.delete('/api/utilisateurs/:id', (req, res) => {
  const sql = 'DELETE FROM Utilisateur WHERE utilisateur_id = ?';
  db.run(sql, req.params.id, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({"message":"deleted", changes: this.changes});
  });
});

/////////panier

//ADD
app.post('/api/panier', (req, res) => {
  const { utilisateur_id, watch_id } = req.body;
  const sql = `INSERT INTO Panier (utilisateur_id, watch_id) VALUES (?, ?, ?)`;
  db.run(sql, [utilisateur_id, watch_id], function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.status(201).json({ "panier_id": this.lastID });
  });
});
// infos

app.get('/api/panier/:userId', (req, res) => {
  const sql = `SELECT * FROM Panier WHERE utilisateur_id = ?`;
  db.all(sql, req.params.userId, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// update 
app.put('/api/panier/:panierId', (req, res) => {
  const { watch_id, quantite } = req.body;
  const sql = `UPDATE Panier SET watch_id = ?, quantite = ? WHERE panier_id = ?`;
  db.run(sql, [watch_id, quantite, req.params.panierId], function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      message: "success",
      changes: this.changes
    });
  });
});
//delete

app.delete('/api/panier/:panierId', (req, res) => {
  const sql = 'DELETE FROM Panier WHERE panier_id = ?';
  db.run(sql, req.params.panierId, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({"message":"deleted", changes: this.changes});
  });
});

//prix total : 
app.get('/watch-price/:watchId', (req, res) => {
  const watchId = req.params.watchId;
  const sql = `
      SELECT 
          b.boitier_prix, 
          p.pierre_prix, 
          br.bracelet_prix 
      FROM 
          Watches w
      JOIN 
          Boitiers b ON w.boitier_id = b.boitier_id
      JOIN 
          Pierres p ON w.pierres_id = p.pierres_id
      JOIN 
          Bracelet br ON w.bracelet_id = br.bracelet_id
      WHERE 
          w.watches_id = ?;
  `;

  db.get(sql, [watchId], (err, row) => {
      if (err) {
          console.error('Error fetching watch price:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      const totalPrice = row.boitier_prix + row.pierre_prix + row.bracelet_prix;
      res.json({ watchId: watchId, totalPrice: totalPrice });
  });
});
//Jointure avec les composants
app.get('/watch-details', (req, res) => {
  const sql = `
      SELECT
          w.watches_id,
          w.watches_name,
          b.boitier_id,
          b.boitier_name,
          b.boitier_prix,
          b.boitier_image_url,
          p.pierres_id,
          p.pierres_name,
          p.pierre_prix,
          br.bracelet_id,
          br.bracelet_name,
          br.bracelet_prix,
          br.bracelet_image_url
      FROM
          Watches w
      INNER JOIN
          Boitiers b ON w.boitier_id = b.boitier_id
      INNER JOIN
          Pierres p ON w.pierres_id = p.pierres_id
      INNER JOIN
          Bracelet br ON w.bracelet_id = br.bracelet_id;
  `;

  db.all(sql, (err, rows) => {
      if (err) {
          res.status(400).json({ "error": err.message });
          return;
      }
      res.json({
          "message": "success",
          "data": rows
      });
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
