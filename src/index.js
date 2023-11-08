const express = require('express');
const app = express();

//configuración 
app.set('port', process.env.PORT || 3000)
app.use(express.json());

app.use(require('../src/routes/usuarios'))
app.use(require('../src/routes/categoria'))
app.use(require('../src/routes/contenido'))
app.use(require('../src/routes/categoria_contenido'))
//routes 


app.listen(app.get('port'),()=>{
    console.log('server on port 3000')
})