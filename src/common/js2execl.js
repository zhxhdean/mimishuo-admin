// Js导出execl
/* json传入数据格式
{
  标题1: 值1,
  标题2: 值2
}
*/
const XLSX = require('xlsx')

var tmpDown //导出的二进制对象
function exportFile(json, type) {
  var _tmpdata = json[0]
  json.unshift({})
  var keyMap = [] //获取keys
  for (var k in _tmpdata) {
    keyMap.push(k)
    json[0][k] = k
  }
  var tmpdata = [] //用来保存转换好的json
  json
    .map((v, i) =>
      keyMap.map((k, j) =>
        Object.assign(
          {},
          {
            v: v[k],
            position:
              (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
          }
        )
      )
    )
    .reduce((prev, next) => prev.concat(next))
    .forEach(
      (v, i) =>
        (tmpdata[v.position] = {
          v: v.v
        })
    )
  var outputPos = Object.keys(tmpdata) //设置区域,比如表格从A1到D10
  var tmpWB = {
    SheetNames: ['mySheet'], //保存的表标题
    Sheets: {
      mySheet: Object.assign(
        {},
        tmpdata, //内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
        }
      )
    }
  }
  tmpDown = new Blob(
    [
      s2ab(
        XLSX.write(
          tmpWB,
          {
            bookType: type === undefined ? 'xlsx' : type,
            bookSST: false,
            type: 'binary'
          } //这里的数据是用来定义导出的格式类型
        )
      )
    ],
    {
      type: ''
    }
  ) //创建二进制对象写入转换好的字节流
  var href = URL.createObjectURL(tmpDown) //创建对象超链接
  document.getElementById('hf').href = href //绑定a标签
  document.getElementById('hf').click() //模拟点击实现下载
  setTimeout(function() {
    //延时释放
    URL.revokeObjectURL(tmpDown) //用URL.revokeObjectURL()来释放这个object URL
  }, 100)
}

function s2ab(s) {
  //字符串转字符流
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
  let s = '',
    m = 0
  while (n > 0) {
    m = (n % 26) + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}

var rABS = false //是否将文件读取为二进制字符串
function importFile(obj) {
  //导入
  if (!obj.files) {
    return
  }
  const f = obj.files[0]

  const reader = new FileReader()
  // var name = f.name
  reader.onload = function(e) {
    let data = e.target.result
    let wb
    if (rABS) {
      wb = XLSX.read(data, { type: 'binary' })
    } else {
      const arr = fixdata(data)
      wb = XLSX.read(btoa(arr), { type: 'base64' })
    }
    document.getElementById('file').innerHTML = JSON.stringify(
      XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
    )
  }
  if (rABS) {
    reader.readAsBinaryString(f)
  } else {
    reader.readAsArrayBuffer(f)
  }
}
function fixdata(data) {
  var o = '',
    l = 0,
    w = 10240
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    )
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}

export default {
  exportFile,
  importFile
}
