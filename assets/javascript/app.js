  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGBL7X3fRVek_Cg4lFN8tLeNnedRq8xMo",
    authDomain: "train-schedule-50591.firebaseapp.com",
    databaseURL: "https://train-schedule-50591.firebaseio.com",
    projectId: "train-schedule-50591",
    storageBucket: "",
    messagingSenderId: "319128474617"
  };
  firebase.initializeApp(config);

      // Create a variable to reference the database
      var database = firebase.database();

      // Button for adding a new train
$('#button-submit').on('click', function(){

    //Grabs user input
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#first-train').val().trim();
    var frequency = $('#frequency').val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency); 

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        dest: destination,
        first: firstTrain, 
        freq: frequency
    }

    //Uploads employee data to the database
    database.ref().push(newTrain);  

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    // Clears all of the text-boxes
    $('#train-name').val('');   
    $('#destination').val('');   
    $('#first-train').val('');   
    $('#frequency').val('');  
    
    return false;   
}); 

firebase.database().ref().on("value", function(snapshot){

})