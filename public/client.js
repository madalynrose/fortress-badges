let currentQuest = 0;
let cookies = [];
let order = null;

$(document).ready(function() {'use strict';

  checkForCompletion();

  document.getElementById('achievement-link').addEventListener('click', loadAchievements);
  document.getElementById('back-home').addEventListener('click', loadQuest);
});


function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx control chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function loadAchievements(){
  clearContent();

  for(var badge in badges){
    if(isComplete(badge)){
      $('#achievements').append('<img alt="'+getBadgeName(badge)+' badge" src="'+getBadgeImageUrl(badge)+'"/>');
    }
  }
  if($('#achievements').find('img').length < 1){
    $('#achievements').append('<h2>You have achieved NOTHING!</h2>');
  }
}


function clearContent(){
  $('#achievements').empty();
  $('#badgeName').empty();
  $('#badgeImage').empty();
  $('#taskDetails').empty();
}

function loadQuest(){
  clearContent();

  let currentHatNumber = getCurrentHat();
  let currentBadge = getCurrentBadge();
  let currentTask = getCurrentTask();

  if(qs('badge')){
    currentBadge = qs('badge');
    Cookies.set('current-fortress-badge', currentBadge);
  }

  if(isComplete(currentBadge)){
    completeBadge(currentBadge);
  }
  else {

    if(!currentHatNumber){
      Cookies.set('current-fortress-hat', Math.floor(Math.random() * 7))
    }

    if(!currentTask){
      currentTask = 1;
      Cookies.set('current-fortress-task', currentTask)
    }

    if(currentBadge && currentTask && currentHatNumber){
      $('#badgeName').append(getBadgeName(currentBadge));
      $('#badgeImage').append('<img alt="'+getBadgeName(currentBadge)+' badge" src="'+getBadgeImageUrl(currentBadge)+'"/>');
      let tasksLeft = 4 - currentTask;
      let tasksLeftText = "<p>You have ";
      let currentHat = hats[currentHatNumber];
      if(tasksLeft == 1){
        tasksLeftText+="just this one left!</p>";
      }
      else{
        tasksLeftText+=(tasksLeft+" tasks to go.</p>")
      }

      $('#taskDetails').append(tasksLeftText);
      $('#taskDetails').append("<h2>Find the person in the "+currentHat+" hat. "+getTaskText(currentBadge, currentTask)+"</h2>");
    }
    else{
      $('#taskDetails').append('<h2>Scan a badge!</h2>');
    }
  }
}

function checkForCompletion(){
  if(qs('complete')){
    let complete = parseInt(qs('complete'));
    if(complete == getCurrentHat() && !isComplete(getCurrentBadge())){
      completeTask();
    }
  }
  loadQuest();
}

function getTaskText(badge, task){
  return badges[badge][task];
}


function getCurrentHat(){
  return parseInt(Cookies.get('current-fortress-hat'));
}

function getCurrentBadge(){
  return Cookies.get('current-fortress-badge');
}

function getCurrentTask(){
  return parseInt(Cookies.get('current-fortress-task'));
}

function completeBadge(badge){
  Cookies.set("fortress-badge-"+badge, true);
  $('#badgeName').append(getBadgeName(badge));
  $('#badgeImage').append('<img alt="'+getBadgeName(badge)+' badge" src="'+getBadgeImageUrl(badge)+'"/>');
  $('#taskDetails').append("<h2>You've Earned This Badge!</h2><br/><h2>Scan another and try to earn them all!</h2>");
}


function advanceHat(){
   let oldHat = getCurrentHat();
   let newHat = Math.floor(Math.random() * 7);
   while(newHat == oldHat){
     newHat = Math.floor(Math.random() * 7);
   }
   Cookies.set('current-fortress-hat', newHat );
}

function completeTask(){
  let currentTask = getCurrentTask();
  let badge = getCurrentBadge();
  if(currentTask == 3){
    currentTask = 0;
    completeBadge(badge);
  }
  Cookies.set('current-fortress-task', currentTask+1);
  advanceHat();
  window.location.replace('/');
}

function isComplete(badge){
  return Cookies.get("fortress-badge-"+badge);
}

function getBadgeName(badge){
  return badges[badge]['NAME'];
}

function getBadgeImageUrl(badge){
  return badges[badge]['image'];
}

const badges = {
  "purging": {
    "NAME":"Purging"
    ,"1":"Thumb wrestle with the hat's owner."
    ,"2":"Beat the owner of the hat in Rock-Paper-Scissors three times. You are only allowed to do rock. "
    ,"3":"Sing your least-favorite Mary Poppins song to the hat owner."
    ,"image": "/images/badge1.png"
  },
  "tsetste-fly": {
    "NAME":"Tsetste Fly"
    ,"1":"Find the hat owner and show them a dance that is both funnier and more well-known than the chicken dance."
    ,"2":"Beat box for 15 seconds for the benefit of the hat owner."
    ,"3":"Tell the owner of the hat 10 words that rhyme with \"Plane.\""
    ,"image": "/images/badge2.png"
  },
  "frat-boy": {
    "NAME":"Frat Boy"
    ,"1":"Stomp, stomp, clap until the owner of the hat breaks down and sings, \"We Will Rock You.\" No verbal clues allowed. "
    ,"2":"Recite the alphabet in a language other than English to the hat's owner."
    ,"3":"Kiss the ring on the hat owner's hand. If they have no ring, make one for them."
    ,"image": "/images/badge3.png"
  },
  "pride-fire": {
    "NAME":"Pride Fire"
    ,"1":"Tell the hat owner about your favorite martial art."
    ,"2":"Give the hat owner a single piece of hair from your head. If you have no hair, give this person your entire head. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge4.png"
  },
  "waterlogged": {
    "NAME":"Waterlogged"
    ,"1":"Challenge the hat's owner to a staring contest. Lose on purpose to make them feel good about themself. "
    ,"2":"Ask the hat owner about their greatest fears. Demonstrate reflective listening. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge5.png"
  },
  "disorienteering": {
    "NAME":"Disorienteering"
    ,"1":"Make the hat owner laugh without tickling them. "
    ,"2":"Find out who the hat owner's greatest influences in life have been."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge6.png"
  },
  "capsized": {
    "NAME":"Capsized"
    ,"1":"Ask the hat owner about their allergies. Find out if they are TRUE allergies or just intolerances."
    ,"2":"Find out what the hat owner's favorite movie sequel is."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge7.png"
  },
  "burnt-something": {
    "NAME":"Burnt Something"
    ,"1":"Tell the hat owner about every pet you've ever owned and what you did with their bodies when they died."
    ,"2":"Put your hand over your mouth and tell the hat owner what you would do if you won the lottery. Hopefully, they won't actually be able to understand you and steal your idea."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge8.png"
  },
  "wipe-out": {
    "NAME":"Wipe Out"
    ,"1":"Ask the hat owner to describe their \"signature drink.\" Then find out how they plan to sign a liquid."
    ,"2":"Tell the hat owner about your favorite religious holiday from someone else's religion."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge9.png"
  },
  "skinny-dipping": {
    "NAME":"Skinny Dipping"
    ,"1":"Tell the hat owner about your least favorite piece of clothing that you are currently wearing. "
    ,"2":"Ask the hat owner to do something \"spontaneous.\" If they don't have ideas, suggest combustion."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge10.png"
  },
  "naughty-corner": {
    "NAME":"Naughty Corner"
    ,"1":"Tell the hat owner what you wish you could tell your 100-year-old self if you could go back in time. "
    ,"2":"In one word, how would you describe something fuzzy? Tell the hat owner your answer."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge11.png"
  },
  "potty-training": {
    "NAME":"Potty Training"
    ,"1":"Try to convince the hat owner that you are double-jointed, even if you aren't. "
    ,"2":"Give the hat owner one high-five for every famous person you would like to get a high-five from. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge12.png"
  },
  "kitty-litter": {
    "NAME":"Kitty Litter"
    ,"1":"Talk to the hat owner about who would play each of you in a movie about two people, one of whom is wearing a colored hat."
    ,"2":"Convince the hat owner that they would look better in a clear hat. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge13.png"
  },
  "peeing-in-the-bushes": {
    "NAME":"Peeing in the Bushes"
    ,"1":"Find out about the hat owner's first hug."
    ,"2":"Taunt the hat owner about your high school being better at field sports than his or hers."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge14.png"
  },
  "running-with-scissors": {
    "NAME":"Running with Scissors"
    ,"1":"If you could eat only one thing for the rest of your life, what would it be? Think about this really hard while making eye contact with the hat owner, but say nothing."
    ,"2":"Make up a brand new handshake with the hat owner. This cannot include a fist bump."
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge15.png"
  },
  "plague-survivor": {
    "NAME":"Plague Survivor"
    ,"1":"Ask the hat owner about where they see themselves in 10,000 years."
    ,"2":"Find the hat owner and describe every sheet you can see while facing them. "
    ,"3":"Show the hat owner this screen. You are now the rightful owner of the hat. Take it and put it on your head. You must wear it the rest of the night until someone else takes it from you by these same means, or until you leave the party, at which point you must give someone else the hat and give them the same instructions."
    ,"image": "/images/badge16.png"
  },
  "gumshoe": {
    "NAME":"Gumshoe"
    ,"1":"Compliment the hat owner about their personality (or their personality disorder.)"
    ,"2":"Hold your nose and sing the Imperial March to the hat owner."
    ,"3":"Do a magic trick for the hat owner."
    ,"image": "/images/badge17.png"
  },
  "more-cowbell": {
    "NAME":"More Cowbell"
    ,"1":"Ask what the hat owner's favorite disease is and then sing a song about it."
    ,"2":"Spell the hat owner's name, but replace every vowel with the word \"sweater.\""
    ,"3":" Convince the hat owner that you are a mime in an invisible box."
    ,"image": "/images/badge18.png"
  },
  "dracarys!": {
    "NAME":"Dracarys!"
    ,"1":"Tell the hat owner a joke about pigeons."
    ,"2":"Tell the hat owner their dwarf name."
    ,"3":"Discuss with the hat owner his/her favorite rental car experience."
    ,"image": "/images/badge19.png"
  },
  "dumpster-diver": {
    "NAME":"Dumpster Diver"
    ,"1":"Compare forearm sizes with the hat owner."
    ,"2":"Name as many different kinds of wood as you can for the hat owner for about 30 seconds."
    ,"3":"Tell the hat owner something embarrasing that might have happened to them early tonight without them noticing. "
    ,"image": "/images/badge20.png"
  },
  "roadkill": {
    "NAME":"Roadkill"
    ,"1":"Play pattycake with the hat owner."
    ,"2":"Act out the balcony scene from Romeo and Juliet with the hat owner."
    ,"3":"Make the hat owner listen to you make barfing noises for 15 seconds."
    ,"image": "/images/badge21.png"
  },
  "hanes-in-flames": {
    "NAME":"Hanes in Flames"
    ,"1":"Trade something with the hat owner."
    ,"2":"Give the hat owner some actual money. Sometimes you need to be rich to get ahead, even in scouting. Get used to it."
    ,"3":"Introduce yourself to the hat owner in both Pig Latin and Latin. "
    ,"image": "/images/badge22.png"
  },
  "burning-yurt": {
    "NAME":"Burning Yurt"
    ,"1":"Give the hat owner a paper airplane."
    ,"2":"Describe to the hat owner your last two rashes."
    ,"3":"Exchange allergies with the hat owner."
    ,"image": "/images/badge23.png"
  },
  "carnivore": {
    "NAME":"Carnivore"
    ,"1":"Read the hat owner's palm to predict their future"
    ,"2":"Do a 30 second drum solo on your belly for the at owner"
    ,"3":"Play peek-a-boo with the hat owner. And also koochie koochie koo. And finally, \"How big is the hat owner? SOOO BIGGGG!\""
    ,"image": "/images/badge24.png"
  },
  "outhouse-tipping": {
    "NAME":"Outhouse Tipping"
    ,"1":"Give the hat owner an A-frame hug."
    ,"2":"Bring the hat owner a drink. "
    ,"3":"Take off one of your socks, put it on your hand, and have the sock puppet flirt with the hat owner."
    ,"image": "/images/badge25.png"
  },
  "grocery-cart-racing": {
    "NAME":"Grocery Cart Racing"
    ,"1":"Arm-wrestle with the hat owner."
    ,"2":"Sing \"Hail to the Victors\" in a Mexican accent to the hat owner."
    ,"3":"Get the hat owner's phone number and text them three emojis you've never used before "
    ,"image": "/images/badge26.png"
  }
};

const hats = ["gray", "black", "pink", "red", "green", "blue", "yellow"];
