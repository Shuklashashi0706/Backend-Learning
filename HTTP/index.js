import http from "http";
import fs from "fs";
import { LovePrecent } from "./features.js";
const home = fs.readFileSync("./demo.html");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.end(home);
  } else if (req.url === "/about") {
    res.end(`<h1>Love is ${LovePrecent()}</h1>`);
  } else {
    res.end("<h1>Error</h1>");
  }
});

server.listen(5000, () => {
  console.log("Server is working");
});
