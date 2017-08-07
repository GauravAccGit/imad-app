console.log('Loaded!');

//Counter Code
var button = document.getElementById("counter");

button.onclick = function() {
  
  // Create a request to counter endoint
  var request = new XMLHttpRequest();
  
  //Capture the response and store it in a variable
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE) {
          //Check response status if success
          if(request.status === 200){
              //Render the response in correct span
              var counter = request.responseText;
              var span = document.getElementById("count");
              span.innerHTML = counter.toString();
          }
      }
      
  };

  // Send a request to counter endoint
  request.open('GET', 'http://enggupta26.imad.hasura-app.io/counter', true);
  request.send(null);
  
};

//Extract name value from the input box
var nameInput = document.getElementById('name');
var valueName = nameInput.value;

//Send request when submit button is clicked and take action on response
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    
   // Create a request to counter endoint
  var request = new XMLHttpRequest();
  
  //Capture the response and store it in a variable
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE) {
          //Check response status if success
          if(request.status === 200){
              //Render the response in correct span
              var names = request.responseText;
              names = JSON.parse(names);
              var list = '';
              for(var i=0; i < names.length; i++) {
                list += '<li>' + names[i] + '</li>';
              }
  
              var ul = document.getElementById('namelist');
              ul.innerHTML = list;
          }
      }
      
  };

  // Send a request to counter endoint
  request.open('GET', 'http://enggupta26.imad.hasura-app.io/submit-name?name=' + valueName, true);
  request.send(null);

};

//Change the text of main-textdiv
//var element = document.getElementById('main-text');
//element.innerHTML = 'New Value';

//var imgName = document.getElementById('madi');

//var marginLeft = 0;

//function moveRight() {
//    marginLeft = marginLeft + 1;
//    imgName.style.marginLeft = marginLeft + 'px';
//}

//imgName.onclick = function() {
  //var count = 0;
  //for(count = 0; count < 50; count++) {
//      var interval = setInterval(moveRight,50);
      //imgName.style.marginLeft = '100px';
  //}
//};

