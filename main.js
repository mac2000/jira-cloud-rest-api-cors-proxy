const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Client = require('node-rest-client').Client

const client = new Client()
const app = express()
const jira = process.env.JIRA || 'https://rabota.atlassian.net'

app.use(cors())
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
	const params = {
		headers: {
			cookie: `cloud.session.token=${req.headers.authorization}`,
			'Content-Type': 'application/json'
		},
		data: Object.assign({}, req.query || {}, req.body || {})
	}

	client[req.method.toLowerCase()](`${jira}${req.path}`, params, (data, response) => {
		res.status(response.statusCode).json(data)
	})
})

app.listen(process.env.PORT || 3000)
