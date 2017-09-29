const express = require('express')
const massive = require('massive')
const { json } = require('body-parser')
const cors = require('cors')
const config = require('./config')
const port = 3005


// CREATE APP & APPLY MIDDLEWARE
const app = express()

app.use(json())
app.use(cors())
app.use(express.static('public'))


// CONNECT TO DATABASE
massive(config.massiveConnectionString).then( db => {
    app.set('db', db)
})


// ENPOINTS
app.get('/api/data', (req,res,next) => {
    const db = app.get('db')
    db.get_all_data().then(data => {
        res.status(200).send(data)
    })
})

app.post('/api/color', (req,res,next) => {
    const db = app.get('db')
    const { h,s,l,black } = req.body

    db.post_color([h,s,l,black]).then(() => {
        res.status(200).send('powsted!')
    })

})


// LISTEN
app.listen(port, () => console.log(`bumpin dat Andre${port}`))