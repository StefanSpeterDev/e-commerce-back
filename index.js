const express = require('express')
const app = express()
const parkings = require('./parkings.json')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.fzdko.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const uri = "mongodb+srv://root:root@cluster0.fzdko.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Thing = require('./thing.js');
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});


async function main () {
    await client.connect();
    const db = await client.db();
    const createStudent = async object => {
        const collection = db.collection('qSD');
        const student = await collection.insertOne(object);
        return student
    }
    const newStudent = {
        name:"rayed",
        status:"étudiant"
    }
    //const insertStudent = await createStudent(newStudent)
    const studentSchema = new Schema({
        email:{
            type: String,
            required: true,
            unique: true
        },
        github: {
            type:String,
            lowercase:true
        },
        first_name:String
    })
}

//main()

// Middleware
app.use(express.json())

app.get('/parkings', (req,res) => {
    res.status(200).json(parkings)
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

app.post('/parkings', (req,res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})

app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name =req.body.name,
    parking.city =req.body.city,
    parking.type =req.body.type,
    res.status(200).json(parking)
})

app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
})

app.listen(8080, () => {
    console.log('Serveur à l\'écoute')
})