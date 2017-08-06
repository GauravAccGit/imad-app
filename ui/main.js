console.log('Loaded!');

//Change the text of main-textdiv
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var imgName = document.getElementById('madi');

var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 10;
    imgName.style.marginLeft = marginLeft + 'px';
}

imgName.onclick = function() {
  var interval = setInterval(moveRight,100);
  //imgName.style.marginLeft = '100px';  
};