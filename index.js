const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')

require('node-jsx').install()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('view cache'); 

require('./routes/index.js')(app)

app.listen(port)
console.log('Aww Yeah Server is Up and Running at Port : ' + port)