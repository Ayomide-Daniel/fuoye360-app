/* eslint-disable no-unused-expressions */
export default function (context, inject) {
  inject('asset', (path) => {
    return `http://fuoye360.test/${path}`
  })
}
