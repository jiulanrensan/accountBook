/*  eslint-disable */
//格式化日期：yyyy-MM-dd
/**
 * @param  {date对象} date
 */
export function formatDate (obj) {
  const basicObj = {
    GMT: '',
    offsetDay: 0,
  }
  Object.assign(basicObj, obj)
  
	if (!basicObj.offsetDay) basicObj.offsetDay = 0
	var targetTime = new Date(new Date(basicObj.GMT).getTime() + Number(basicObj.offsetDay*24*60*60*1000))
	var myyear = targetTime.getFullYear()
	var mymonth = targetTime.getMonth() + 1
  var myweekday = targetTime.getDate()
  var hour = targetTime.getHours() < 10 ? `0${targetTime.getHours()}` : targetTime.getHours()
  var minutes = targetTime.getMinutes() < 10 ? `0${targetTime.getMinutes()}` : targetTime.getMinutes()
  var second = targetTime.getSeconds() < 10? `0${targetTime.getSeconds()}` : targetTime.getSeconds()
	if (mymonth < 10) {
		mymonth = "0" + mymonth
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday
	}
return (`${myyear}-${mymonth}-${myweekday} ${hour}:${minutes}:${second}`)
}

// 默认为yyyy-mm-dd格式,相等返回true,不相等返回false
export function timeComparison (firstDate, secondDate) {
  if ((firstDate.slice(0,4) - secondDate.slice(0,4)) === 0) {
    if ((firstDate.slice(5,7) - secondDate.slice(5,7)) === 0) {
      if ((firstDate.slice(-2) - secondDate.slice(-2)) === 0) {
        return true
      } else return false
    } else return false
  } else {
    return false
  }
}

// 将分类icon映射到相对应的分类中文
// 为什么在其他地方引用会报错？？
export function iconMap (data) {
  const arr = Array.prototype.concat(this.GLOBAL.outcomeCategoriesList, this.GLOBAL.incomeCategoriesList)
  let index = arr.findIndex(el => el.iconName === data)
  return arr[index].value
}