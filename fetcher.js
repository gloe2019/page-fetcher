const request = require("request");
const fs = require("fs");
const args = process.argv.slice(2);

const fetcher = (url, path) => {
  url = args[0];
  path = args[1];
  let filesize;
  request(url, (error, response, body) => {
    console.log("statusCode: ", response && response.statusCode);
    if (error) {
      console.log("❌Invalid URL❌");
      return error;
    }
    if (response.statusCode !== 200) {
      console.log("Invalid status code, no file write occured");
      return `${response && response.statusCode} Invalid status code`;
    }
    fs.writeFile(path, body, { flag: "wx" }, (err) => {
      if (err) {
        console.log("❌fs.Write error❌");
        console.error(err);
        return;
      }
      filesize = fs.statSync(path);
      console.log(`✅Downloaded ${filesize.size} bytes of data to ${path}`);
    });
  });
};

fetcher(args);
