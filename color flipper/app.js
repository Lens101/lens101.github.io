const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");
console.log(color);

btn.addEventListener('click',function(){

    const randomNumber = getRandomNumber();
    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];

});


//Get random number between 0 and 3.
function getRandomNumber(){
    
    return Math.floor(Math.random()*4);
};



