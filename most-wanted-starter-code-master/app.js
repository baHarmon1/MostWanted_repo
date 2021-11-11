"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      displayPerson(searchResults)
      break;
    case 'no':
      searchResults = searchByTrait(people);
      // maybe function to ask to end
      break;
      default: 
    app(people); // restart app
      break;
  }
  mainMenu(searchResults, people)
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      displayPerson(person)
    break;
    case "family":
      displayFamily(person, people)
    break;
    case "descendants":
      displayDescendants(person, people)
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByTrait(people){
  let userInput = promptFor("Would you like to search by eye color, gender, height, weight or occupation?", autoValid).toLowerCase();
  let resultTrait = "";
  switch(userInput) {
    case "eye color":
      resultTrait = searchByEyeColor(people);
      onePerson(resultTrait, people)
      break;
      case "gender":
      resultTrait = searchByGender(people)
      onePerson(resultTrait, people)
      break;
      case "height":
      resultTrait = searchByHeight(people)
      onePerson(resultTrait, people)
      break;
      case "weight":
      resultTrait = searchByWeight(people)
      onePerson(resultTrait, people)
      break;
      case "occupation":
      resultTrait = searchByOccupation(people)
      onePerson(resultTrait, people)
      break;
      default:
      searchByTrait(people); // ask again
    }
}

function onePerson(searchResults, people) {
  if (searchResults.length == 1) {
        mainMenu(searchResults, people)   
  } else { 
      alert("Your search includes multiple people, redirecting to filter by traits");
      searchByTrait(searchResults)
    }
  }
//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid).toLowerCase();
  let lastName = promptFor("What is the person's last name?", autoValid).toLowerCase();

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName.toLowerCase() === firstName && potentialMatch.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
    let eyeColor = promptFor("What is the person's eye color?", autoValid).toLowerCase();

    let foundPerson = people.filter(function(potentialMatch){
      if(potentialMatch.eyeColor === eyeColor){
        return true;
      }
      else{
        return false;
    }
  })
  return foundPerson;
}

function searchByHeight(people){
    let height = promptFor("What is the person's height?", autoValid);

    let foundPerson = people.filter(function(potentialMatch){
      if(potentialMatch.height == height){
        return true;
      }
      else{
        return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people){
    let weight = promptFor("What is the person's weight?", autoValid);

    let foundPerson = people.filter(function(potentialMatch){
      //if(weight < people.weight - 5 && weight > people.weight + 5){  
      if(potentialMatch.weight == weight){
        return true;
      }
      
else{
        return false;
      }
    }
  )
  return foundPerson;
}

function searchByGender(people){
    let gender = promptFor("What is the person's gender?", autoValid).toLowerCase();

    let foundPerson = people.filter(function(potentialMatch){
      if(potentialMatch.gender === gender){
        return true;
      }
      else{
        return false;
    }
  })
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid).toLowerCase();

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  let firstName = "First Name: " + person[0].firstName; 
  let lastName =  "Last Name: " + person[0].lastName;
  let gender = "Gender: " + person[0].gender;
  let dob = "Date Of Birth: " + person[0].dob;
  let height = "Height: " + person[0].height;
  let weight = "Weight: " + person[0].weight;
  let eyeColor = "Eye color: " + person[0].eyeColor;
  let occupation = "Occupation: " + person[0].occupation;
  alert(firstName+'\n'+lastName+'\n'+gender+'\n'+dob+'\n'+height+'\n'+weight+'\n'+eyeColor+'\n'+occupation);
}

function displayFamily(person, people){
  let parentsFound = findParents(person, people);
  let parent1 = "First parent: " + parentsFound[0].firstName + " " + parentsFound[0].lastName;
  let parent2 =  "Second parent: " + parentsFound[1].firstName + " " + parentsFound[1].lastName;
  let spouseFound = findSpouse(person, people);
  let currentSpouse = "Current Spouse: " + spouseFound[0].firstName + " " + spouseFound[0].lastName;
  alert(parent1+'\n'+parent2+'\n'+currentSpouse+'\n');
}

function displayDescendants(person, people){
  let descendantsFound = findDescendants(person, people);
  if (descendantsFound.length == 0) {
    alert("This person has no descendants")
  } else if (descendantsFound.length == 1){
    let child1 = "Only child: " + descendantsFound[0].firstName + " " + descendantsFound[0].lastName;
    alert(child1)
  } else {
    let child1 = "First child: " + descendantsFound[0].firstName + " " + descendantsFound[0].lastName;
    let child2 =  "Second child: " + descendantsFound[1].firstName + " " + descendantsFound[1].lastName;
    alert(child1+'\n'+child2+'\n');
  }
}

function findSpouse(person, people) {
  var person = person;
  let foundSpouse = people.filter(function(element){
    if(element.id === person[0].currentSpouse) {
      return true;
    } else {
      return false;
    }
  })
return foundSpouse
}
function findParents(person, people) {
  var person = person;
  let foundParents = people.filter(function(element){
    if(element.id === person[0].parents[0] || element.id === person[0].parents[1]) {
      return true;
    } else {
      return false;
    }
  })
return foundParents
}

function findDescendants(person, people){
  var person = person;
  let foundDescendants = people.filter(function(element){
    if(person[0].id === element.parents[0] || person[0].id === element.parents[1]) {
      return true;
    } else {
      return false;
    }
  })
return foundDescendants
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion
