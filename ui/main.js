console.log('Loaded!');

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

var counter = 0;
var button = document.getElementById("counter");

button.onclick = function() {
  // Send a request to counter endoint
  
  //Capture the response and store it in a variable
  
  //Render the response in correct span
  counter = counter + 1;
  var span = document.getElementById("count");
  span.innerHTML = counter.toString();
  
};