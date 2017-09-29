var els = document.getElementsByClassName("squish-button");
for(var z = 0; z < els.length; z++) {
  els[z].addEventListener('click', function(){
    var c = decodeURI(this.getAttribute("data-original-content"));
    this.parentNode.innerHTML = c;
  });
}
