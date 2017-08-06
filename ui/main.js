console.log('Loaded!');

//Change the text of main-textdiv
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var imgName = document.getElementById('madi');

var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 1;
    imgName.style.marginLeft = marginLeft + 'px';
}

imgName.onclick = function() {
  var count = 0;
  //for(count = 0; count < 50; count++) {
      var interval = setInterval(moveRight,50);
      //imgName.style.marginLeft = '100px';
  //}
};