  // Starting Firebase
  var config = {
    apiKey: "AIzaSyDGBL7X3fRVek_Cg4lFN8tLeNnedRq8xMo",
    authDomain: "train-schedule-50591.firebaseapp.com",
    databaseURL: "https://train-schedule-50591.firebaseio.com",
    projectId: "train-schedule-50591",
    storageBucket: "",
    messagingSenderId: "319128474617"
  };
  firebase.initializeApp(config);

      // Sets varaible to reference Firebase data
      var database = firebase.database();

      // On clicking submit button, adds a train to the display
$('#button-submit').on('click', function(){

    //User input is stored here
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#first-train').val().trim();
    var frequency = $('#frequency').val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency); 

    // This object will store our data until pushed onto Firebase
    var newTrain = {
        name: trainName,
        dest: destination,
        first: firstTrain, 
        freq: frequency
    }

    //Sends data to firebase
    database.ref().push(newTrain);  

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    // Will clear the values in our inputs
    $('#train-name').val('');   
    $('#destination').val('');   
    $('#first-train').val('');   
    $('#frequency').val('');  
    
    return false;   
}); 

// Updates HTML based on our Firebase data
database.ref().on('child_added', function(childSnapshot){
    console.log(childSnapshot.val());   

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;


    // Train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // First time
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");   
    console.log(firstTimeConverted);    

    // Current time
    var currentTime = moment(); 
    console.log("Current Time: " + moment(currentTime).format("HH:mm"))

    // Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");    
    console.log("Difference in Time: " + diffTime);  

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;  
    console.log(tRemainder);    

    // Mins until train
    var tMinutesTillTrain = frequency - tRemainder; 
    console.log("Minutes Until Train: " + tMinutesTillTrain);   

    // Next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm"); 
    console.log("Arrival Time: " + nextTrain);  

    $("#train-content").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

}); 

function play(){
    var audio = $("#audio");
    audio.play();
};