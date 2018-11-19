
// 校验密码
const validatePassWord = val => {
  if (!val) {
    return false
  }
  if(/\d/.test(val) && /[a-z]+/.test(val) && /[A-Z]/.test(val)){
    const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,12}$/
    if(reg.test(val)){
      return true
    }
    return false
  }
  return false
}

export default {
  validatePassWord
}
