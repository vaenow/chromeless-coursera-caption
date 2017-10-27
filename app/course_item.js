const puppeteer = require('puppeteer')
const API = require('./api')
const logger = require('./Logger')
const path = require('path')

module.exports = async function courseItem(browser, page) {
	// const page = await browser.newPage()
	
	// await page.setRequestInterceptionEnabled(true);
	// page.on('request', interceptedRequest => {
	// 	if (interceptedRequest.url.match('guidedCourseSessionProgresses')) {
	// 		console.log(interceptedRequest)
	// 	}

	// 	// if (interceptedRequest.url.endsWith('.png') || interceptedRequest.url.endsWith('.jpg'))
	// 	// 	interceptedRequest.abort();
	// 	// else
	// 	// 	interceptedRequest.continue();
	// });

	await page.addScriptTag({content: 'API = ' + JSON.stringify(API)})
	await page.addScriptTag({path: path.join(__dirname, 'jquery.min.js')})

	const content = await page.evaluate(() => {
		// const data = []
		// $(".rc-DomainNav > a").each((index, element) => {
		// 	const $element = $(element);
		// 	const dataVal = JSON.parse($element.attr('data-click-value'))
		// 	data.push(dataVal)

		// 	console.log('dataVal', dataVal)
		// })
		// alert(JSON.stringify(API))
		return $.getJSON(API.COURSE_WEEKS)
			.then(resp => {
				console.log(resp)
			})
			// .then(() => Promise.resolve())

		// return Promise.resolve(data)
	})
}