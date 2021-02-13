app.get('/users/create', async (req, res) => {
    let newUserName = req.query.name;
    let pinString = req.query.pin;
    console.log(`Creating user ${newUserName}`);
    let u = new User(newUserName, pinString);
    res.send(u);
});