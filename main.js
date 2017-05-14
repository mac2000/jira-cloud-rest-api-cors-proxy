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
	const url = `${jira}${req.path}`

	const params = {
		headers: {
			cookie: `cloud.session.token=${req.headers.authorization}`,
			'Content-Type': 'application/json'
		},
		data: req.body,
		parameters: req.query
	}

	client[req.method.toLowerCase()](url, params, (data, response) => {
		if (response.statusCode !== 200) {
			if (Buffer.isBuffer(data)) {
				data = {
					data: data.toString('utf8')
				}
			}
			data.proxied = {
				url,
				data: req.body,
				parameters: req.query
			}
		}
		res.status(response.statusCode).json(data)
	})
})

app.listen(process.env.PORT || 3000)
