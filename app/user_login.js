const puppeteer = require('puppeteer')
const logger = require('./Logger')
const loginInfo = require('./login_info')
const API = require('./api')

module.exports = async function userLogin() {
	logger.time('打开浏览器')
	const browser = await puppeteer.launch({headless:false})
	logger.time('打开浏览器')

	logger.time('打开页面')
	const page = await browser.newPage()
	page.setViewport({width: 1024, height: 768}); //1290 800
	await page.setRequestInterceptionEnabled(true);
	page.on('request', interceptedRequest => {
		if (
			interceptedRequest.url.indexOf('.png') !== -1
			|| interceptedRequest.url.indexOf('.jpg') !== -1
		)
			interceptedRequest.abort();
		else
			interceptedRequest.continue();
	});
	await page.goto(API.COURSE_HOME)
	logger.time('打开页面')

	logger.time('加载页面')
	const loginBtn = ".c-ph-right-nav-button.c-ph-log-in"
	await page.waitForSelector(loginBtn, { timeout: 60 * 1000 })
	logger.time('加载页面')

	logger.time('用户登录')
	await page.click(loginBtn)
	await page.waitForSelector('input[type=email]')
	await page.type('input[type=email]', loginInfo.username, {delay: 10})
	await page.keyboard.press('Enter')
	await page.type('input[type=password]', loginInfo.password, {delay: 10})
	await page.click('button[data-js=submit]')
	await page.waitForSelector('.rc-EnrollmentsList')
	logger.time('用户登录')

	return {browser, page}
}