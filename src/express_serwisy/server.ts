import {User} from "./model/user";
import {LoggerService, TimedLoggerService} from "./service/logger-service";
import {ClickbaitService} from "./service/clickbait-service";
import {ExamService} from "./service/exam-service";

const express = require('express');
const app = express();

//pozwala na import stałych z json-a; trzeba ustawić opcje kompilacji w tsconfig.json
// import {LoggerService} from "./service/logger-service";
// import {ExternalDataService} from "./service/external-data-service";
const port = 3001;


//startup
app.service = {};
app.service.log = new TimedLoggerService();  //todo: select type
app.service.clickbait = new ClickbaitService(app.service.log);   //przekazuje instancję logera do serwisu clickbait
app.service.exams = new ExamService('https://doha.wsi.edu.pl:5200', app.service.log);


// let data = new ExternalDataService('https://doha.wsi.edu.pl:5200', app.service.log);

app.get('/', async (req, res) => {
    res.send({"comment": 'App works ok!'});
});

app.get('/post', async (req, res) => {
    //sposób na odczytanie danych przekazanych w parametrze zapytania http GET
    await app.service.clickbait.click();

    let name = req.query.name;
    let age = parseInt(req.query.age);
    let pesel = req.query.pesel;
    if (name===undefined || age === undefined || pesel === undefined) {
        await app.service.log.error('Data missing in call to /post');
        res.send({'comment': 'parameters name,age,pesel are obligatory'});
        return;
    }
    let u = new User(name, age, pesel);

    await app.service.log.info(JSON.stringify(u));

    res.send(u);
});

app.get('/clicks', async (req, res) => {
    res.send({"clicks": await app.service.clickbait.get_clicks()});
});

app.get('/exams', async (req, res) => {
    res.send({"exams": await app.service.exams.getAllExams()});
});



console.log(`Starting app: http://localhost:${port}/post`);
app.listen(port, '0.0.0.0');