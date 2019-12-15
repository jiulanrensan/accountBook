/*  eslint-disable */
//格式化日期：yyyy-MM-dd
/**
 * @param  {date对象} date
 */
export function formatDate (obj) {
  const basicObj = {
    GMT: '',
    offsetDay: 0,
    separator: '-'
  }
  Object.assign(basicObj, obj)
  
	if (!basicObj.offsetDay) basicObj.offsetDay = 0
	var targetTime = new Date(new Date(basicObj.GMT).getTime() + Number(basicObj.offsetDay*24*60*60*1000))
	var myyear = targetTime.getFullYear()
	var mymonth = targetTime.getMonth() + 1
	var myweekday = targetTime.getDate()
	if (mymonth < 10) {
		mymonth = "0" + mymonth
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday
	}
	return (`${myyear}${basicObj.separator}${mymonth}${basicObj.separator}${myweekday}`)
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
export function iconMap (data) {
  const arr = Array.prototype.concat(this.GLOBAL.outcomeCategoriesList, this.GLOBAL.incomeCategoriesList)
  let index = arr.findIndex(el => el.iconName === data)
  return arr[index].value
}