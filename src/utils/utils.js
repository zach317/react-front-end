import debounce from 'debounce-promise'

export const USERNAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]{3,15}$/
export const PASSWORD_PATTERN = /(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d]){8,16}/
export const NO_SPACER_PATTERN = /^[^\s]*$/
export const PHONE_PATTERN = /^1\d{10}$/
export const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export const debounceReturn = (func, ...rest) =>
  debounce(async (_, value) => {
    const { username } = rest
    if (!value) return
    // 不校验当前用户名
    if (value === username) return
    const res = await func(value)
    if (res.success) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(res.message))
  }, 500)
