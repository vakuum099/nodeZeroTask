import http = require("http");
import fs = require("fs");

const postData: http.RequestListener = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      const preparedData = dataToUpperCase(body) + "\n";
      fs.appendFileSync("..\\data\\data.txt", preparedData);
    });
    response.end("Data updated.");
  } else {
    response.statusCode = 403;
    response.statusMessage = "Forbidden activity.";
    response.end("Error 403. Forbidden activity.");
  }
};

const dataToUpperCase = (data: string) => {
  const parsedData = JSON.parse(data);
  const dataUpperCase = { ...parsedData };
  for (let key in parsedData) {
    const phrase = parsedData[key];
    dataUpperCase[key] = phrase[0].toUpperCase() + phrase.slice(1);
  }
  return JSON.stringify(dataUpperCase);
};

const server: http.Server = http.createServer(postData);

server.listen(3000, () => console.log("Server listen 3000 port."));
