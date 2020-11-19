const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

const dbRoutes = require('./routers');

dbRoutes(app);

/* */

// app.post('/login', (req,res) => {
//     const user = {id: 3};
//     const token = jwt.sign({user}, 'my_secret_key');
//     res.json({
//         token
//     });
// });

// app.get('/protected', ensureToken,(req, res) => {
//     jwt.verify(req.token, 'my_secret_key', (err, data) => {
//         if (err) {
//             res.sendStatus(403);
//         }
//         else {
//             res.json({
//                 text: 'protected'
//             });
//         }
//     });
// });

// function ensureToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     }
//     else {
//         res.sendStatus(403);
//     }
// }

/* */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
