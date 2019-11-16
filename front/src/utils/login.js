export default source => {
  location.href = `${process.env.VUE_APP_BACKEND}/login?return=${process.env.VUE_APP_FRONTEND}${source}`
}
