console.log('Loaded!');

//Change the text of main-textdiv
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var imgName = document.getElementById('madi');

imgName.onclick = function() {
  imgName.style.marginLeft = '100px';  
};