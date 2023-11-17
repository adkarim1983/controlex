const express = require('express');
const app = express();

// middleware pour vérifier l'heure, si ouvert --> next, si non: affiche page stylé. 
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hourOfDay = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next();
    } else {
       //ici, je voulais renvoyer une page HTML stylée pour les heures de fermeture, au lieu d'avoir un simple message
       res.sendFile(__dirname + '/views/test.html');
    }
};
// Utilisation du middleware
app.use(checkWorkingHours);
app.use(express.static('public'));

// Itinéraires
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

// Route pour servir services.html à l'URL //views/services.html
app.get('/services.html', (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact.html', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});


app.get('/home.html', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

// finalement démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
