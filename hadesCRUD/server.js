const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb+srv://Pasquale:SubParDeliMeat@cluster0.hkqo9.mongodb.net/?retryWrites=true&w=majority',  { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('hades-crud-app')
  const godsCollection = db.collection('gods')
  app.get('/', (request, response)  => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api', (request, response) => {
    response.json(hadesGAME)      
})

app.get('/api/:name', (request, response) => {
    const character = request.params.name.toLowerCase()
    console.log(character)
    if( hadesGAME[request.params.name] ){
        response.json(hadesGAME[character])
    }else{
        response.json(hadesGAME['unknown'])
    }
   
})

app.post('/gods', (request, response) => {
    godsCollection.insertOne(request.body)
    .then(result =>{
       
        res.redirect('/')
    }) 
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`This server is running on port ${PORT}!`)
})




  
})
.catch(error => console.error(error))


const hadesGAME = {
    
        'hades':{
            'name': 'hades',
            'god of': 'Death and ruler of the underworld',
            'child of': 'Cronus & Rhea',
        },
        'zagreus':{
            'name': 'zagreus',
            'god of': 'hunting & rebirth',
            'child of': 'Hades & Persephonie',
        },
        'nyx':{
            'name': 'nyx',
            'goddess of': 'the night itself, she is sometimes called the Mother Night',
            'child of': 'Chaos',
        },
        'unknown':{
            'name': 'unknown',
            'goddess of': 'unknown',
            'child of': 'unknown',
        }
    
}

