define(function(require,exports,module){
	"use strict"

	class CourtDown {
		constructor(timestamp){
			Object.assign(this,{timestamp})
		}
		use(){
				let me = this,
				   endTime = new Date(me.timestamp).getTime(),
				   nowTime = new Date().getTime(),
				   differ ;
				 if(isNaN(endTime)){
				 	return window.alert(timestamp+"时间戳解析失败")
				 } 
				 differ = endTime - nowTime;
				 if(differ <= 0){
				 	return window.alert("倒计时已到！")
				 } 

				 return this.formateTimestamp(differ);
				
				 
			}
			formateTimestamp (differTime){

					let me = this,
				    day = 24*60*60*1000,
				    hour = 60*60*1000,
				    minutes = 60*1000,
				    seconds = 1000,
				 	dayStamp = Math.floor(differTime/day),
				 	hourStamp = Math.floor((differTime - dayStamp*day)/hour),
				 	minutesStamp = Math.floor((differTime -  hourStamp*hour)/minutes),
				 	secondsStamp = Math.floor((differTime - minutesStamp*minutes)/seconds);
					return {
					 	"days": me.formateString(dayStamp),
					 	"hours": me.formateString(hourStamp),
					 	"minute": me.formateString(minutesStamp),
					 	"second": me.formateString(secondsStamp)
					};
			}
			formateString(num){
				return ("00"+num).slice(-2);
			}
	}
	let timer = new CourtDown("2016-07-6 15:59");
	let interval =  window.setInterval(function(){
		let data = timer.use();
		console.log(data)
		if(!data){
			return window.clearInterval(interval);
		}
	$("#content").html("时间还剩余:" + data.days + "天" +data.hours + "小时" + data.minute+ "分钟" + data.second + "秒");
 },1000)
})