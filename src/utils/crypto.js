import CryptoJS from 'crypto-js'

const secret = 'zach_front'

const crypto = {
  // 加密
  encrypt: (data) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString(),
  // 解密
  decrypt: (data) =>
    JSON.parse(CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8)),
}

export default crypto
