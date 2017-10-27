/**
* @date 2017-10-27
*/
const userLogin = require('./app/user_login')
const courseItem = require('./app/course_item')

async function run() {

	const { browser, page } = await userLogin()

	await courseItem(browser, page)

	// browser.close()
}

run()
