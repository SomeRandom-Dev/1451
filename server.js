const path = require("path");

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
fastify.get("/amogusrealvery", function (request, reply) {
  
  var imgURL = "";
  
  var randint = Math.floor(Math.random() * 100);

  var imgEXT = ".gif";
  
  //require('child_process').spawn('bash', ['-c', 'ffmpeg -i polish-cow.jpg -vf "drawtext=fontfile=comic-sans.ttf:text=\'' + request.ip + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=50" -codec:a copy public/cowpoland' + randint.toString() + '.jpg'])
  /* gif version */ require('child_process').spawn('bash', ['-c', 'ffmpeg -i polish-cow.gif -vf "drawtext=fontfile=comic-sans.ttf:text=\'' + request.ip + '\':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.5:boxborderw=5:x=50:y=50" -codec:a copy public/cowpoland' + randint.toString() + '.gif'])
  sleep(3000).then(() => {
    imgURL = site_url + "/gifs/cowpoland" + randint.toString() + imgEXT;
    
    
    let params = {
      link_to_img: imgURL,
      site_url: site_url
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
