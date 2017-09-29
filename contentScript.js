var threshold = 50;//if sync.get fails, we use 50 as a default.

chrome.storage.sync.get({
  threshold: '50'
}, function(items) {
  threshold = items.threshold;
});

//deal with newly loaded tweets
function DOMModificationHandler(){
    $(this).unbind('DOMSubtreeModified.event1');
    setTimeout(function(){
        modify();
        $('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);
    },10);
}
$('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);

function modify(){
  //find and modify tall tweets
  $('.tweet-text').each(function(index){
    var t = $(this).html();
    var len = t.split(/\r\n|\r|\n/).length;
    if(!$(this).hasClass("squished") && len > threshold){
      $(this).addClass("squished");
      $(this).html(`<button class="squish-button EdgeButton EdgeButton--primary" data-original-content="${encodeURI(t)}">Show Long Tweet</button>`);
      //if we add a new button, we have to add listeners again...
      chrome.runtime.sendMessage({message: "listeners"}, function(response) {
      });
    }
  });
}
