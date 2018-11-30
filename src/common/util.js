// 校验密码
const validatePassWord = val => {
  if (!val) {
    return false
  }
  if (/\d/.test(val) && /[a-z]+/.test(val) && /[A-Z]/.test(val)) {
    const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,12}$/
    if (reg.test(val)) {
      return true
    }
    return false
  }
  return false
}

// 求时间差几天
const subDay = (time1, time2) => {
  const days = time1 - time2
  const rst = parseInt(days / (1000 * 60 * 60 * 24), 10)
  return rst < 0 ? 0 : rst
}

// 首字母转大写
const toUpperFirstLetter = str => {
  if(!str){
    return ''
  }
  if(str.length>=1){
    const first = str.substr(0, 1).toUpperCase()
    const _a = str.split('')
    _a.splice(0,1,first)
    return _a.join('')
  }
}

export default {
  validatePassWord,
  subDay,
  toUpperFirstLetter
}
