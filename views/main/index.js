function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 8000);
}

 
$(document).ready(myFunction());


$("#searchbut").click(function() {
  navigate()
});

function navigate(){
  var getValue = document.getElementById('myselect').value; 
  if(getValue == "tokyo"){
    window.open('https://www.kayak.com/Tokyo-Hotels.21033.hotel.ksp?r9ck=iq&gclid=Cj0KCQiApL2QBhC8ARIsAGMm-KEVUgJIpDRm7RG27EuKKXCZIbGeG9sF8CGrLqmITzfzfwZEzIBynFUaAlOmEALw_wcB');
    location.href='../tokyo/tokyohtml.html';  
  }
  else if(getValue == "tosaka"){
    window.open('https://www.kayak.com/Osaka-Hotels.25901.hotel.ksp?r9ck=iq&gclid=Cj0KCQiApL2QBhC8ARIsAGMm-KExweKpHja8D0DoNgwViNDmDpxVxCfQiIXb36mvGy2OiyBRtWIxZoYaAi1QEALw_wcB');
    location.href='../tosaka/tosakahtml.html';  
  }
  else if(getValue == "niigata"){
    window.open('https://www.kayak.com/Niigata-Hotels.11087.hotel.ksp?r9ck=iq&gclid=Cj0KCQiApL2QBhC8ARIsAGMm-KHHcKdP9KEPawCtYrqWHVUNg7NigfwkIkaYjtyjT6S9EOy_-E6w7q8aAnAuEALw_wcB');
    location.href='../niigata/nigatahtml.html';
  }
  else if(getValue == "kyoto"){
    window.open('https://www.kayak.com/Kyoto-Hotels.20339.hotel.ksp?r9ck=iq&gclid=Cj0KCQiApL2QBhC8ARIsAGMm-KEQNogOrirC8nqb0coZTK0GMVK4IrStQSc8hmbG_ERn6u6QI7fIfaoaAtLlEALw_wcB');
    location.href='../kyoto/kyotohtml.html';
  } 
  console.log(getValue);
}






var audio = new Audio('eternal.mp3');

var x = 0;
var animation = document.querySelector("div");

$("#player").click(function() {
  if(x%2 == 0){
    audio.play();
    animation.id = "leaves";
  }else{
    audio.pause();
    animation.id = "";
  }
  x++;
});

 $(document).keydown(function(e){
    if(e.keyCode == 13){
      if(x%2 == 0){
        audio.play();
        
      }else{
        audio.pause();
      }
      x++;
    }

  });

 


$(document).ready(function () {
    $("#myselect").change(function () {
        var val = $(this).val();
        if (val == "tokyo") {
            $("#selecthotel").html("<option value='test'>Sunroute Plaza</option><option value='test2'>Sinjuku Granbellh</option>");
        } else if (val == "tosaka") {
            $("#selecthotel").html("<option value='test'>Hiyori</option><option value='test2'>Sliber</option>");
        } else if (val == "niigata") {
            $("#selecthotel").html("<option value='test'>Okura</option><option value='test2'>Furumachi</option>");
        } else if (val == "kyoto") {
            $("#selecthotel").html("<option value=''>Hotel Granvia</option><option value=''>Mystays</option>");
        }
    });
});






const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.squared');

    if (entry.isIntersecting) {
      square.classList.add('square-animation');
    return; // if we added the class, exit the function
    }

    // // We're not intersecting, so remove the class!
    // square.classList.remove('square-animation');
  });
});

observer.observe(document.querySelector('.square-wrapper1'));
observer.observe(document.querySelector('.square-wrapper2'));
observer.observe(document.querySelector('.square-wrapper3'));
observer.observe(document.querySelector('.review1'));
observer.observe(document.querySelector('#wave1'));
observer.observe(document.querySelector('#wave2'));


const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.querySelector('.imaged');

    if (entry.isIntersecting) {
      square.classList.add('image-animation');
    return; // if we added the class, exit the function
    }

    // // We're not intersecting, so remove the class!
    // square.classList.remove('image-animation');
  });
});

observer2.observe(document.querySelector('#images'));
observer2.observe(document.querySelector('#player'));





const observer3 = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      entry.target.classList.add('square-animation2');
    }
  });
});

observer3.observe(document.querySelector('#wave2'));
observer3.observe(document.querySelector('.findhotelt'));





observer3.observe(document.querySelector('#navt1'));
observer3.observe(document.querySelector('#navt2'));
observer3.observe(document.querySelector('#navt3'));
observer3.observe(document.querySelector('#navt4'));
observer3.observe(document.querySelector('#player'));
observer3.observe(document.querySelector('.textcity'));
observer3.observe(document.querySelector('.directions'));