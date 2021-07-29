const request = require("request");
const fs = require("fs");
const args = process.argv.slice(2);
// console.log(args);

const fetcher = (url, path) => {
  url = args[0];
  path = args[1];
  let filesize;
  request(url, (error, response, body) => {
    console.error("error msg: ", error);
    console.log("statusCode: ", response && response.statusCode);
    //console.log("body: ", body);
    fs.writeFile(path, body, { flag: "wx" }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      filesize = fs.statSync(path);
      console.log(`Downloaded ${filesize.size} bytes of data to ${path}`);
    });
  });
};

fetcher(args);
