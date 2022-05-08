const path = require("path");
const fs = require("fs");
const axios = require('axios');

const site_url = "https://future-innovative-crushe.glitch.me";

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false,
  trustProxy: true
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/gifs", // optional: default '/'
});

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//removeme

// Our main GET home page route, pulls from src/pages/index.hbs
fastify.get("/verykolyes", function (request, reply) {
  
  var imgURL = "";

  var imgEXT = ".gif";
  
  var sleepTime = 1;
  
  if (!fs.existsSync("/app/public/cowpoland" + request.ip + imgEXT)) {
    sleepTime = 1500;
    axios.get('http://ip-api.com/json/' + request.ip).then(res => {
      //require('child_process').spawn('bash', ['-c', 'ffmpeg -i polish-cow.jpg -vf "drawtext=fontfile=comic-sans.ttf:text=\'' + request.ip + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=50" -codec:a copy public/cowpoland' + request.ip + '.jpg'])
      /* gif version */ 
      // drawtext=fontfile=comic-sans.ttf:text=\'' + res.data.?? + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=50
      require('child_process').spawn('bash', ['-c', 'ffmpeg -i polish-cow.gif -vf "[in]drawtext=fontfile=comic-sans.ttf:text=\'' + request.ip + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=50, drawtext=fontfile=comic-sans.ttf:text=\'' + res.data.country + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=100, drawtext=fontfile=comic-sans.ttf:text=\'' + res.data.regionName + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=150, drawtext=fontfile=comic-sans.ttf:text=\'' + res.data.city + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=200, drawtext=fontfile=comic-sans.ttf:text=\'' + res.data.lat.toString() + ', ' + res.data.lon.toString() + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=250, drawtext=fontfile=comic-sans.ttf:text=\'' + res.data.isp + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=300[out]" -codec:a copy public/cowpoland' + request.ip + '.gif'])
      /* ----------- */
      console.log("generated gif for ip -> " + request.ip);
    });
  }
  sleep(sleepTime).then(() => {
    imgURL = site_url + "/gifs/cowpoland" + request.ip + imgEXT;
    
    
    let params = {
      link_to_img: imgURL,
      site_url: site_url,
      ip: request.ip
    };
    // request.query.paramName <-- a querystring example
    reply.view("/src/pages/index.hbs", params);
  })
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
