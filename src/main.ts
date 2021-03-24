//all stuff for express/socketio
import * as express from "express";
import * as socketio from "socket.io";
import * as httplib from "http";
import { Request, Response } from "express";

//path
import * as path from "path";

//fs
import * as fs from "fs";


//CommonJS import required bc express is stoneage😔
const routing = require("./routings")

//port
const PORT = process.env.PORT || 300

//express stuff
const app = express();
app.set("port", PORT);

//setup routing
app.use("/", routing)

let http = new httplib.Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

app.get("/", (req: Request, res: Response) => res.redirect(302, "/notes"))

io.on("connection", function(socket: socketio.Socket) {
	console.log("a user connected");
	// whenever we receive a 'message' we log it out
	socket.on("message", function(message: any) {
    	console.log(message);
  	});
});

http.listen(PORT, function() {
  	console.log(`Listening on *:${PORT}`);
});