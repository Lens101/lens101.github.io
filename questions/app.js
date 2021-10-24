//TODO:

//hide text by default - done in CSS.

//only after clicking button open text for that element - question.classList.toggle('show-text');

//if close button, hide text again. - toggle works for both!

//if open another button question, close currently open text, and open new answer text. - forEach question if the button clicked !== the

//Method1:

//Using selectors inside the element

const questions = document.querySelectorAll(".question");

questions.forEach(function (question) {
  //console.log(question); - returns all the questions.
  const btn = question.querySelector(".question-btn"); //From inside 'question' tag, query select the tags with the class .question-btn. - Cool!
  //console.log(btn);

  btn.addEventListener("click", function () {
    //Close the other question if a new one is opened, only one open at a time.
    questions.forEach(function (item) {
      //console.log(item);
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});

//Method 2:

//Traversing the DOM
//select 'ALL' the buttons using querySelectorAll.

/* 
const btns = document.querySelectorAll(".question-btn");

//console.log(btns); - returns all 3 buttons as a NodeList

//Loop through the buttons using forEach()
btns.forEach(function (btn) {
    btn.addEventListener("click", function(e){
        //console.log(e.currentTarget.parentElement.parentElement); - shows us the button 
        const question = e.currentTarget.parentElement.parentElement;
        question.classList.toggle('show-text'); //toggle lets us open and close with the same button.
    })
});
*/

//.parentElement just moves up a tag in the HTML tree,
//meaning i can reference a div from one of its nested child div's.

/* 
        addition for the tabs functionality
==========================================================
==========================================================
==========================================================

*/

const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    //remove active from the other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    //Hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});
