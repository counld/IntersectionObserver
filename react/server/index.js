const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.get('/tab1', (req, res) => {
	setTimeout(() => {
    res.send('这是tab11111111111的内容...')
  }, 300)
})
app.get('/tab2', (req, res) => {// 立即返回值
    res.send('这是tab2的内容...')
})
app.get('/tab3', (req, res) => {
  setTimeout(() => {
    res.send('这是tab3的内容...')
  }, 3000)
})
app.listen('5500', () => {
  console.log('server running at 5500 port...')
})