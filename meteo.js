const apiKey = "1d58abefd8f228d76c34846965c4ac6e"; // création variable "apiKey" 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // création variable 
const weatherIcon = document.querySelector(".weather-icon"); // Création de la variable "weather-icon"

let city; // Déclaration de la variable 'city'

// Charger les données du fichier conf.json
fetch("/conf.json")
  .then(response => response.json())
  .then(data => {city = data.ville; // Utiliser la valeur de 'ville' dans le fichier conf.json
    // Appelle la fonction checkWeather toutes les heures
    setInterval(() => {checkWeather(city);}, 3600);}) // 3600000 millisecondes = 1 heure
  
  .catch(error => console.error('Erreur:', error));

async function checkWeather(ville){ // création de la fonction "async (response + await)" "checkWeather" 
// qui a pour rôle d'attendre la transformation 
// de la requête HTTP en objet Javascipt (data) pour continuer le code
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // construction d'une variable
       
    if(response.status == 404){ // création d'un message en cas de mauvaise saisit
        document.querySelector(".error").style.display="block"; // message d'erreur si la saisit n'est pas bonne
        document.querySelector(".weather").style.display="none"; // affiche le résultat si la saisie est correct.
    } else {
        var data = await response.json(); // création d'une variable "data" qui contient les données JSON 
        // renvoyé par l'"API" dans un "objet" javascript
        //  avec les infos météo de la ville saisie mais qui stop la progression tant que les infos ne sont 
        // pas obtenues.
 
        document.querySelector(".ville").innerHTML = data.name; // transfert l'info "name" vers la fonction
        // "ville".
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c"; // transfert
        //  l'info HTML "temp" vers la fonction "temp".
        document.querySelector(".humidité").innerHTML = data.main.humidity + "%"; // transfert l'info HTML
        // "humidity" vers la fonction "Humidité".
        document.querySelector(".vent").innerHTML = data.wind.speed + "km/h"; // transfert l'info "Wind.speed" 
        // vers la fonction "vent".
        if(data.weather[0].main == "Clouds"){ // définit l'affichage de l'icon nuageux.
            weatherIcon.src="/img/clouds.png"; // source de l'icon nuageux.
        } else if(data.weather[0].main == "Clear"){ // définit l'affichage de l'icon ensoleillé.
            weatherIcon.src="/img/clear.png"; // source de l'icon ensoleillé.
        } else if(data.weather[0].main == "Haze"){ // définit l'affichage de l'icon brumeux.
            weatherIcon.src="/img/haze.svg"; // source de l'icon brumeux.
        } else if(data.weather[0].main == "Snow"){ // définit l'affichage de l'icon neigeux.
            weatherIcon.src="/img/snow.png"; // source de l'icon neigeux.
        } else if(data.weather[0].main == "Rain"){ // définit l'affichage de l'icon pluvieux.
            weatherIcon.src="/img/rain.png"; // source de l'icon pluvieux.
        } else if(data.weather[0].main == "Drizzle"){ // définit l'affichage de l'icon bruineux.
            weatherIcon.src="/img/drizzle.png"; // source de l'icon bruine.
        }
        document.querySelector(".weather").style.display = "block"; // masque l'endroit ou s'affiche le résultat 
        // de recherche a l'ouverture
        document.querySelector(".error").style.display="none"; // si erreur, masque le résultat de recherche
    }
} 