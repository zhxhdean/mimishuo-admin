export const STATUS = {
  CHECKING: 'CHECKING',
  UNLOGIN: 'UNLOGIN',
  LOGINED: 'LOGINED'
}

// 分页默认的条数
export const DEFAULT_PAGESIZE = 2

// 分页默认的页码
export const DEFAULT_PAGEINDEX = 1

// 标签
export const DEFAULT_SECRET_TAGS = [
  {
    label: '十分重要',
    value: 1
  },
  {
    label: '亟需解决',
    value: 2
  },
  {
    label: '纯属恶搞',
    value: 3
  }
]

// secret状态
export const SECRET_STATUS = {
  INIT: 1, // 初始
  PRE_PUBLISH: 2, // 待发布
  PUBLISHING: 3, // 发布中
  PUBLISHED: 4 // 已发布
}

export const getSecretStatus = status => {
  if (status === SECRET_STATUS.INIT) {
    return '初始'
  } else if (status === SECRET_STATUS.PRE_PUBLISH) {
    return '待发布'
  } else if (status === SECRET_STATUS.PUBLISHING) {
    return '发布中'
  } else if (status === SECRET_STATUS.PUBLISHED) {
    return '已发布'
  } else {
    return '未知'
  }
}

export const CATEGORY = {
  VULGAR: 1, //粗话
  EROTIC: 2, // 色情
  FORBID: 3, //国家禁止
  OTHER: 4 //其他
}

export const getCategory = category => {
  if (category === CATEGORY.VULGAR) {
    return '粗言秽语'
  } else if (category === CATEGORY.EROTIC) {
    return '低俗色情'
  }
  else if (category === CATEGORY.FORBID) {
    return '国家禁止'
  }
  else {
    return '其他'
  }
}

// 发送类型
export const CONFIG_SEND_EVENT = {
LOGIN: 'LOGIN',
FORGET_PASSWORD: 'FORGET_PASSWORD',
CHANGE_MOBILE: 'CHANGE_MOBILE',
CHANGE_EMAIL: 'CHANGE_EMAIL'
}

export const CONFIG_KEY = '!2@M0m1S8'
