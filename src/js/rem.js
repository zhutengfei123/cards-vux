'use strict'
let screenWid = document.documentElement.offsetWidth || document.body.offsetWidth
let nowFont = 100 * screenWid / 375
let oHtml = document.getElementsByTagName('html')[0]
oHtml.style.fontSize = nowFont + 'px'
window.onresize = function () {
  let screenWid = document.documentElement.offsetWidth || document.body.offsetWidth
  let nowFont = 100 * screenWid / 375
  let oHtml = document.getElementsByTagName('html')[0]
  oHtml.style.fontSize = nowFont + 'px'
}
