// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.

//Use a preloader while the video is loading on a slow network speed.

//Target the button
const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

btn.addEventListener("click", function(){
    //if button doesn't have slide class, add it.
    if(!btn.classList.contains("slide")){
        btn.classList.add("slide");
        video.pause();
    }else {
        btn.classList.remove("slide");
        video.play();
    }
})

const preloader = document.querySelector(".preloader");

//once everything is loaded, hide the preloader image, so the mp4 is shown not the gif.
window.addEventListener('load', function () {
    preloader.classList.add("hide-preloader");

});