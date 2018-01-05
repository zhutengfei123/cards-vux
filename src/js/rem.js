'use strict'
const screenWid = document.documentElement.offsetWidth || document.body.offsetWidth
const nowFont = 100 * screenWid / 375
const oHtml = document.querySelector('html')
oHtml.style.fontSize = nowFont + 'px'
