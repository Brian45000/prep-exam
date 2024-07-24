var express = require("express");
const helmet = require("helmet");

const csrf = require("csrf");
const tokens = new csrf();

const cookieParser = require("cookie-parser");
var axios = require("axios");

const path = require("path");

var app = express();
app.use(express.json());

const csrfProtection = csrf({ cookie: true }); // Configure le token CSRF avec les cookies

// Protection CORS
var cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"], // Remplacez par l'URL de votre front-end
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
};
app.use(cors(corsOptions));

app.use(helmet());

app.use(cookieParser()); // Utilisez le cookie-parser pour lire les cookies

// Middleware pour ajouter le token CSRF aux réponses
function middlewareCsrf(req, res, next) {
  try {
    const csrfToken = req.headers["x-csrf-token"];
    const secret = "mytoken";
    if (!csrfToken || !tokens.verify(secret, `${csrfToken}`)) {
      return res.status(403).send("Invalid CSRF Token");
    }
    next();
  } catch {
    res.status(401).send({
      status: 401,
      message: "Non autorisé.",
    });
  }
}

// Sécurity.txt
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

app.get("/", (req, res) => {
  const token = tokens.create("mytoken");
  res.send({
    status: true,
    message: "Bienvenue sur l'API",
    csrfToken: token, // Incluez le token CSRF dans la réponse
  });
});

// Utilisez csrfProtection comme middleware avant le gestionnaire de route
app.get("/our-api/:id", middlewareCsrf, async (req, res) => {
  const id = req.params.id;

  // Si POST faire sanitizeHtml :
  /*let { id, libelle, description, prix, categorie, images, token } = req.body;
  const secret = process.env.CSRF_TOKEN;
  if (!token || !tokens.verify(secret, `${token}`)) {
    return res.status(403).send("Invalid CSRF Token");
  }*/

  try {
    const response = await axios.get(`https://api.adviceslip.com/advice/${id}`);
    res.send({
      slip: { id: id, advice: response.data.slip.advice },
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching advice", error });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("What???");
});

// This is REQUIRED for IISNODE to work
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));
