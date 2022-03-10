const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/signup.html')
})

app.post('/', function (req, res) {
	const firstName = req.body.fName
	const lastName = req.body.lName
	const email = req.body.email

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribe',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	}

	const jsonData = JSON.stringify(data)

	const url = 'https://us14.api.mailchimp.com/3.0/lists/9aea4abb75'

	const options = {
		method: 'POST',
		auth: 'MiguelDominguez:462b88b96c93c2941066cd6d77940b22-us14',
	}

	const request = https.request(url, options, function (response) {
		response.on('data', function (data) {
			console.log(JSON.parse(data))
		})
	})

	request.write(jsonData)
	request.end()
})

app.listen(3000, function () {
	console.log('Server is running on port 3000')
})

// API Key
// 462b88b96c93c2941066cd6d77940b22-us14

// List id || Audience id
// 9aea4abb75
