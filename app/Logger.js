let logAction = {
	msg: '',
	time: 0
}
module.exports = class Logger {

	static time(msg) {
		if (logAction.msg !== msg) {
			console.log(msg, '...')
			logAction.msg = msg
			logAction.time = Date.now()
		} else {
			console.log(msg, '成功', (Date.now() - logAction.time) / 1000 + 's')
		}
	}

	static log(msg) {
		console.log(msg)
	}
}