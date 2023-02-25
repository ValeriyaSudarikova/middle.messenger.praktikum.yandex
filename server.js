//--no-eslintrc
const express = require("express")

const app = express()
const PORT = 3000

app.use("/", express.static("public"))

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`)
})
