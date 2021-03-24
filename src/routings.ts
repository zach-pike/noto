import * as express from "express";
import { Request, Response } from "express";

//fs
import * as fs from "fs";

//ssr stuff
import { navBar } from "./ssr";

//path
import * as path from "path";

//make router
const router = express.Router()

function stdRoute(req: Request, res: Response, notFound?: string): void {
	let url = req.url;

	if (url.endsWith(".html")) {
		let html = fs.readFileSync(path.join(__dirname, "../public/", url), "utf-8")

		html = navBar(html)

		res.set('Content-Type', 'text/html')
		res.status(200).send(html)
		res.end()

	} else {
		res.sendFile(path.join(__dirname, "../public", url))
	}
}

function basicLoad(req: Request, res: Response, filename: string): void {
	let html = fs.readFileSync(path.join(__dirname, "../public/", filename), "utf-8")

	html = navBar(html)

	res.set('Content-Type', 'text/html')
	res.status(200).send(html)
	res.end()
}

//routing for script files
router.get("/scripts/*", (req: Request, res: Response) => {
	stdRoute(req, res)
})
//styles routing
router.get("/styles/*", (req: Request, res: Response) => {
	stdRoute(req, res)
})


//routing for homepage
router.get("/", (req: Request, res: Response) => {
    basicLoad(req, res, "newnote.html")
})

//createnote
router.get("/createNote", (req: Request, res: Response) => {
	console.log(req.query)
	res.send("")
})

router.get("/edit", (req: Request, res: Response) => {
	basicLoad(req, res, "edit.html")
})

//Capture All 404 errors
router.use(function (req, res, next){
	let html = fs.readFileSync(path.join(__dirname, "../public/http/error.html"), "utf-8")

	html = html.replace(/({{errCode}})/, "404 Not Found")

	res.status(404).send(html)
});


module.exports = router