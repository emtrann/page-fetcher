// should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

// Use the request library to make the HTTP request
// Use Node's fs module to write the file
// Use the callback based approach we've been learning so far
// Do not use the pipe function
// Do not use synchronous functions (see warning below)


// input = command line argument, takes in url + the local file path then downloads the resource to that path 
// need to make HTTP request to get into such as byte/content length 

// Node FS module - refer to yestwerday's notes. should be able to use that to download to specified path - possibly writeFileAsync

// somehow incorportate callbacks into this... 

// should return "downloded and saved 1235 bytes to ./index"
  // note the relative path to index 
  // should be able byte sz from content length - refer tp httpExample + index = CLI[3]

const request = require('request');
const fs = require('fs');

let commandArg = process.argv.slice(2);

const pageFetcher = () => {
  
  request(commandArg[0], (error, response, body) => {
    console.log('error:', error); 
    console.log('statusCode:', response && response.statusCode);
      if (response.statusCode !== 200) {
        console.log('We were unable to get a response from the server');
      } else {
        console.log('body:', body); 
        let byteLength = Buffer.byteLength(body, 'utf8')
        fs.writeFile(commandArg[1], body, (err) => {
          if (err) throw err;
          console.log(`Downloaded and saved ${byteLength} bytes to ${commandArg[1]}`);
        });
      }  
   });
};

pageFetcher(); 


// request(commandArg[0], (error, response, body) => {
//   console.log('error:', error); 
//   console.log('statusCode:', response && response.statusCode); 
//   console.log('body:', body); 
//   let data = body;
//   fs.writeFile('filePath', data, (err) => {
//     if (err) throw err;
//     console.log('The file has been downloaded!');
//   });
// });