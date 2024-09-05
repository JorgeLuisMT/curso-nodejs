import chalk from "chalk";
import axios from "axios";

const API_KEY = "6d81715e662540c97a16622423a3376b";

function displayWeather(city, weatherData) {
  console.log(`\nInformación del clima: ${city}`);
  console.log(chalk.yellow("************************"));
  console.log(chalk.cyan("Descripción"), weatherData.weather[0].description);
  console.log(chalk.cyan("Temperatura"), `${weatherData.main.temp} °C`);
  console.log(chalk.cyan("Humedad"), `${weatherData.main.humidity}%`);
  console.log(
    chalk.cyan("Velocidad del viento"),
    `${weatherData.wind.speed} m/s`
  );
  console.log(chalk.yellow("************************"));
}

function handleError(err) {
  console.log(chalk.red("Error: "), err.message);
  process.exit(1);
}

async function getWeather(city) {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await axios.get(endpoint, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
    throw new Error(`Error al obtener la información de ciudad: ${city}`);
  }
}

function getData() {
  let city = process.argv[2];

  if (!city) {
    console.log(
      chalk.red("Por favor, proporcione un nombre de lugar o ciudad.")
    );
    console.log(
      chalk.red(
        "Ejecuta la instrucción de la siguiente forma: node app.js [nombre ciudad]"
      )
    );
  }

  getWeather(city)
    .then((weatherData) => displayWeather(city, weatherData))
    .catch(handleError);
}

getData();
