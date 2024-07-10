const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/createModel.js');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const uri = 'mongodb+srv://matbalinton:root@matdb.iv1uwka.mongodb.net/?retryWrites=true&w=majority&appName=matDb';

mongoose.connect(uri)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is connected to port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Something went wrong:', error);
    });

app.get('/', (req, res) => {
    console.log('Hello World');
    res.send('Hello World');
});
app.post('/users', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = User({name, email, password});
        await user.save();
        res.status(201).send(user);
    }
    catch(error) {
        res.status(400).send(error);
    }
})
app.get('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send("Id not Found");
        }
        res.status(200).send(user);
    }
    catch(error) {
        res.status(500).send(error);
    }
})

app.put('/users/:id', async(req, res) => {
    const { id } = req.params;
    const { name, email, password }= req.body;
    const updateUser = await User.findByIdAndUpdate(id, {name, email, password}, { new: true, runValidators: true});

    if (!updateUser) {
        res.status(404).send("Can't find that specific User.");
    }
    res.status(200).send("User Updated Successfully!");
})


//Delete Request
app.delete('/users/:id', async(req, res) => {
    try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
        res.status(404).send("User is not Found.");
    }
    res.status(200).send("Deleted Successfully!");
}catch (error) {
    res.status(500).send(error);
}

})


