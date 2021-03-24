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

	if (fs.existsSync(path.join(__dirname, "../public", url))) {
		
		if (url.endsWith(".html")) {
			let html = fs.readFileSync(path.join(__dirname, "../public/", url), "utf-8")

			html = navBar(html)

			res.set('Content-Type', 'text/html')
			res.status(200).send(html)
			res.end()

		} else {
			res.sendFile(path.join(__dirname, "../public", url))
		}

	} else {
		if (typeof notFound == "undefined") {
			let notfoundhtml = fs.readFileSync("public/http/404.html", "utf-8")

			res.set('Content-Type', 'text/html')
			res.status(404).send(notfoundhtml)
			res.end()
		} else {
			res.set('Content-Type', 'text/html')
			res.status(404).send(notFound)
			res.end()
		}
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

router.get("/createNote", (req: Request, res: Response) => {
	console.log(req.query)
	res.send("")
})

router.get("/notes", (req: Request, res: Response) => {
	basicLoad(req, res, "newnote.html")
})

//routing for pretty much everything else
router.get("/*", (req: Request, res: Response) => {
    stdRoute(req, res)
})

module.exports = router