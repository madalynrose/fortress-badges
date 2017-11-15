// server.js
// where your node app starts


// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



function getQuestOrder(cohort){
  switch(cohort){
    case 1:{
      return [1, 2, 3];
      break;
    } 
    case 2:{
      return [1, 3, 2];
      break;
    } 
    case 3:{
      return [2, 1, 3];
      break;
    } 
    case 4:{
      return [2, 3, 1];
      break;
    } 
    case 5:{
      return [3, 1, 2];
      break;
    } 
    case 6:{
      return [3, 2, 1];
      break;
    }
    default:{
      break;
    }
  }
}

app.post("/cookie", function(request, response){
  let quest = parseInt(request.query.quest);
  response.send(quests[quest-1].cookie);
});


app.post("/clue", function(request, response){
  let quest = parseInt(request.query.quest);
  try{
    response.send(quests[quest-1].clue);
  }
  catch(e){
    response.sendStatus(404);
  }
});

app.post("/order", function(request, response){
  let order = getQuestOrder(parseInt(request.query.cohort));
  response.send(order);
});

app.post("/guess", function(request, response){
  let quest = parseInt(request.query.quest);
  let guess = request.query.guess;
  let correct = guess == quests[quest-1].answer;
  response.send(correct);
});

app.post("/cohort", function(request, response){
  cohort = parseInt(request.query.cohort);
  response.sendStatus(200);
});

// Simple in-memory store for now
const quests = [
  {clue: "Clue 1", answer: "Red", cookie: 'fortress-quest-red'},
  {clue: "Clue 2", answer: "Green", cookie: 'fortress-quest-green'},
  {clue: "Clue 3", answer: "Blue", cookie: 'fortress-quest-blue' }
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let cohort = null;
let done = [];

const badges = {
  "purging": {
    "NAME":"Purging"
    ,"1":"Thumb wrestle with the hat's owner."
    ,"2":"Beat the owner of the hat in Rock-Paper-Scissors three times. You are only allowed to do rock. "
    ,"3":"Sing your least-favorite Mary Poppins song to the hat owner."
  },
  "tsetste-fly": {
    "NAME":"Tsetste Fly"
    ,"1":"Find the hat owner and show them a dance that is both funnier and more well-known than the chicken dance."
    ,"2":"Beat box for 15 seconds for the benefit of the hat owner."
    ,"3":"Tell the owner of the hat 10 words that rhyme with \"Plane.\""
  },
  "frat-boy": {
    "NAME":"Frat Boy"
    ,"1":"Stomp, stomp, clap until the owner of the hat breaks down and sings, \"We Will Rock You.\" No verbal clues allowed. "
    ,"2":"Recite the alphabet in a language other than English to the hat's owner."
    ,"3":"Kiss the ring on the hat owner's hand. If they have no ring, make one for them."
  },
  "pride-fire": {
    "NAME":"Pride Fire"
    ,"1":"Tell the hat owner about your favorite martial art."
    ,"2":"Give the hat owner a single piece of hair from your head. If you have no hair, give this person your entire head. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "waterlogged": {
    "NAME":"Waterlogged"
    ,"1":"Challenge the hat's owner to a staring contest. Lose on purpose to make them feel good about themself. "
    ,"2":"Ask the hat owner about their greatest fears. Demonstrate reflective listening. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "disorienteering": {
    "NAME":"Disorienteering"
    ,"1":"Make the hat owner laugh without tickling them. "
    ,"2":"Find out who the hat owner's greatest influences in life have been."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "capsized": {
    "NAME":"Capsized"
    ,"1":"Ask the hat owner about their allergies. Find out if they are TRUE allergies or just intolerances."
    ,"2":"Find out what the hat owner's favorite movie sequel is."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "burnt-something": {
    "NAME":"Burnt Something"
    ,"1":"Tell the hat owner about every pet you've ever owned and what you did with their bodies when they died."
    ,"2":"Put your hand over your mouth and tell the hat owner what you would do if you won the lottery. Hopefully, they won't actually be able to understand you and steal your idea."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "wipe-out": {
    "NAME":"Wipe Out"
    ,"1":"Ask the hat owner to describe their \"signature drink.\" Then find out how they plan to sign a liquid."
    ,"2":"Tell the hat owner about your favorite religious holiday from someone else's religion."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "skinny-dipping": {
    "NAME":"Skinny Dipping"
    ,"1":"Tell the hat owner about your least favorite piece of clothing that you are currently wearing. "
    ,"2":"Ask the hat owner to do something \"spontaneous.\" If they don't have ideas, suggest combustion."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "naughty-corner": {
    "NAME":"Naughty Corner"
    ,"1":"Tell the hat owner what you wish you could tell your 100-year-old self if you could go back in time. "
    ,"2":"In one word, how would you describe something fuzzy? Tell the hat owner your answer."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "potty-training": {
    "NAME":"Potty Training"
    ,"1":"Try to convince the hat owner that you are double-jointed, even if you aren't. "
    ,"2":"Give the hat owner one high-five for every famous person you would like to get a high-five from. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "kitty-litter": {
    "NAME":"Kitty Litter"
    ,"1":"Talk to the hat owner about who would play each of you in a movie about two people, one of whom is wearing a colored hat."
    ,"2":"Convince the hat owner that they would look better in a clear hat. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "peeing-in-the-bushes": {
    "NAME":"Peeing in the Bushes"
    ,"1":"Find out about the hat owner's first hug."
    ,"2":"Taunt the hat owner about your high school being better at field sports than his or hers."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "running-with-scissors": {
    "NAME":"Running with Scissors"
    ,"1":"If you could eat only one thing for the rest of your life, what would it be? Think about this really hard while making eye contact with the hat owner, but say nothing."
    ,"2":"Make up a brand new handshake with the hat owner. This cannot include a fist bump."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "plague-survivor": {
    "NAME":"Plague Survivor"
    ,"1":"Ask the hat owner about where they see themselves in 10,000 years."
    ,"2":"Find the hat owner and describe every sheet you can see while facing them. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
  },
  "gumshoe": {
    "NAME":"Gumshoe"
    ,"1":"Compliment the hat owner about their personality (or their personality disorder.)"
    ,"2":"Hold your nose and sing the Imperial March to the hat owner."
    ,"3":"Do a magic trick for the hat owner."
  },
  "more-cowbell": {
    "NAME":"More Cowbell"
    ,"1":"Ask what the hat owner's favorite disease is and then sing a song about it."
    ,"2":"Spell the hat owner's name, but replace every vowel with the word \"sweater.\""
    ,"3":" Convince the hat owner that you are a mime in an invisible box."
  },
  "dracarys!": {
    "NAME":"Dracarys!"
    ,"1":"Tell the hat owner a joke about pigeons."
    ,"2":"Tell the hat owner their dwarf name."
    ,"3":"Discuss with the hat owner his/her favorite rental car experience."
  },
  "dumpster-diver": {
    "NAME":"Dumpster Diver"
    ,"1":"Compare forearm sizes with the hat owner."
    ,"2":"Name as many different kinds of wood as you can for the hat owner for about 30 seconds."
    ,"3":"Tell the hat owner something embarrasing that might have happened to them early tonight without them noticing. "
  },
  "roadkill": {
    "NAME":"Roadkill"
    ,"1":"Play pattycake with the hat owner."
    ,"2":"Act out the balcony scene from Romeo and Juliet with the hat owner."
    ,"3":"Make the hat owner listen to you make barfing noises for 15 seconds."
  },
  "hanes-in-flames": {
    "NAME":"Hanes in Flames"
    ,"1":"Trade something with the hat owner."
    ,"2":"Give the hat owner some actual money. Sometimes you need to be rich to get ahead, even in scouting. Get used to it."
    ,"3":"Introduce yourself to the hat owner in both Pig Latin and Latin. "
  },
  "burning-yurt": {
    "NAME":"Burning Yurt"
    ,"1":"Give the hat owner a paper airplane."
    ,"2":"Describe to the hat owner your last two rashes."
    ,"3":"Exchange allergies with the hat owner."
  },
  "carnivore": {
    "NAME":"Carnivore"
    ,"1":"Read the hat owner's palm to predict their future"
    ,"2":"Do a 30 second drum solo on your belly for the at owner"
    ,"3":"Play peek-a-boo with the hat owner. And also koochie koochie koo. And finally, \"How big is the hat owner? SOOO BIGGGG!\""
  },
  "outhouse-tipping": {
    "NAME":"Outhouse Tipping"
    ,"1":"Give the hat owner an A-frame hug."
    ,"2":"Bring the hat owner a drink. "
    ,"3":"Take off one of your socks, put it on your hand, and have the sock puppet flirt with the hat owner."
  },
  "grocery-cart-racing": {
    "NAME":"Grocery Cart Racing"
    ,"1":"Arm-wrestle with the hat owner."
    ,"2":"Sing \"Hail to the Victors\" in a Mexican accent to the hat owner."
    ,"3":"Get the hat owner's phone number and text them three emojis you've never used before "
  }
};


