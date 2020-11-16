const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => {
    Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }

        return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
    });
};

const makeDomo = (req, res) => {
    if (!req.body.name || !req.body.age || !req.body.favFood) {
        return res.status(400).json({ error: 'RAWR! Both name, age, and favorite food are required' });
    }

    const domoData = {
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        owner: req.session.account._id,
    };

    const newDomo = new Domo.DomoModel(domoData);

    const domoPromise = newDomo.save();

    domoPromise.then(() => res.json({ redirect: '/maker' }));

    domoPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Domo already exists.' });
        }

        return res.status(400).json({ error: 'An error occurred' });
    });

    return domoPromise;
};

const randomDomo = (req, res) => {
    const nameField = document.querySelector("#domoName");
    const ageField = document.querySelector("#domoName");
    const foodField = document.querySelector("#domoName");

    const randName = ["Debby", "Takashi", "Sarah", "Jason", "Yuki"];
    const randFood = ["Ice Cream", "Pizza", "Hamburger", "Ramen", "Salad"]

    nameField.value = randName[Math.floor(Math.random() * randName.length)];
    ageField.value = Math.floor(Math.random() * Math.floor(100));
    foodField.value = randFood[Math.floor(Math.random() * randFood.length)];
};

const getDomos = (request, response) => {
    const req = request;
    const res = response;

    return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }

        return res.json({ domos: docs });
    });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.getDomos = getDomos;
module.exports.randomDomo = randomDomo;