import * as http from 'http';
import * as fs from 'fs';
import { Methods, Resource, response404 } from './constants';
import { addDataToFile, changeDataInFile, deleteFile, readDataFromFile } from './utils';

const requestRouter: http.RequestListener = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {

  const url: string[] = String(request.url).split('/');
  const resource = url[1] as Resource; // create, read, change, delete
  const method = request.method as Methods; // POST, GET, PUT, DELETE
  const targetedFile = url[2];

  //Wrong URI
  if (!Methods[resource]) {
    response.writeHead(400, 'Bad request.');
    return response.end('Error 400. Bad request.');
  }

  //URI didn't match with method
  if (method !== Methods[resource]) {
    response.writeHead(405, 'Method Not Allowed', {
      Allow: `${Methods[resource]}`,
    });
    return response.end('Error 405. Method Not Allowed');
  }

  //Not PUT method and the file don't exist
  if (method !== 'POST' && !fs.existsSync(`../data/${targetedFile}.txt`)) {
    response.writeHead(404, 'Not Found.');
    return response.end(response404);
  }

  //Add data to the file. If file doesn't exist, create it.
  if (method === 'POST') {
    let body = '';
    request.on('data', (data) => {
      body += data;
    });
    request.on('end', () => {
      addDataToFile(body, targetedFile);
    });
    response.writeHead(205, 'Reset Content');
    return response.end();
  }

  //Show content of the file.
  if (method === 'GET') {
    const data = readDataFromFile(targetedFile);
    response.writeHead(200, 'OK');
    return response.end(data);
  }

  //Rewrite conten of the file.
  if (method === 'PUT') {
    let body = '';
    request.on('data', (data) => {
      body += data;
    });
    request.on('end', () => {
      changeDataInFile(body, targetedFile);
    });
    response.writeHead(205, 'Reset Content.');
    return response.end();
  }

  //Delete file.
  if (method === 'DELETE') {
    deleteFile(targetedFile);
    response.writeHead(200, 'OK. File deleted.');
    return response.end('File deleted.');
  }
};

const server: http.Server = http.createServer(requestRouter);

server.listen(3000, () => console.log('Server listen 3000 port.'));
