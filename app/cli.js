getCourseId = (resp) => {
	return resp.elements[0].courseId;
}
getVideoInfos = (resp) => {
	let videoInfos = []
	resp.elements[0].weeks.forEach((wk, wkNum) => {
		console.log(wkNum + 1 + ' week')
		wk.modules.forEach(wkm => {
			// wkm.id
			console.log(wkm.id)
			wkm.items.forEach(wkmi => {
				// console.log(wkmi, wkmi.resourcePath)
				// const {
				// 	typeName
				// } = wkmi.contentSummary
				// typeName === 'lecture' && console.log(wkmi.resourcePath)
				if(wkmi.contentSummary.typeName === 'lecture') {
					videoInfos.push(Object.assign({}, wkmi))
				}
			})
		})
	})
	return videoInfos
}



// https://www.coursera.org/api/onDemandLectureVideos.v1/{COURSE_ID}~{ITEM_ID}?includes=video&fields=onDemandVideos.v1(sources%2Csubtitles%2CsubtitlesVtt%2CsubtitlesTxt)
// https://www.coursera.org/api/onDemandLectureVideos.v1/2dHcFsRdEeW2JxKnR3RyOw~Jyc3t?includes=video&fields=onDemandVideos.v1(sources%2Csubtitles%2CsubtitlesVtt%2CsubtitlesTxt)