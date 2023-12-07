// i18n.js
import { initI18n } from 'i18n-pro'

const { t, setI18n, withI18n } = initI18n({
  // 命名空间属性是必须配置的
  namespace: 'testI18N',
})

// 这里可以挂载 API 到全局对象上，可以避免不同模块都需要通过 import 来引入 API
// 注意：如果当前你是在某个独立的第三方库或者组件中使用 i18n-pro，不推荐这样做，可能会造成你的用户 API 命名冲突
// 浏览器环境，注意：如果是 Node 环境需要将 window 替换成 global
window.t = t
window.setI18n = setI18n
window.withI18n = withI18n

// 不挂载 API 到全局对象上的话，需要导出 API 以便于其他模块能使用对应 API
export { t, setI18n, withI18n }
