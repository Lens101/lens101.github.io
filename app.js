// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.

// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const linksContainer = document.querySelector(".links-container");
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", function () {
  //linksContainer.classList.toggle("show-links"); //useful if not using dynamic data as can reference hardcoded css value.

  const containerHeight = linksContainer.getBoundingClientRect().height;
  //console.log(containerHeight); //-height will be 0, when closed, 200 when open(with 4 links)
  const linksHeight = links.getBoundingClientRect().height;

  //if true, dynamically add height to container.
  //this keeps the container dynamic depending on how many links are present in the link container.

  //if the height is 0, i.e. links are hidden, on click show the links, but make them dynamic
  //according to how many links are present, known through the linksHeight parameter.
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
const logo = document.querySelector(".logo");

//This will fix the navbar once you scroll down past it to keep it always available to the user's screen.

// ********** fixed navbar ************
window.addEventListener("scroll", function () {
  //console.log(window.pageYOffset); //will log the curernt scroll value down the page.
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav"); //not .fixed-nav here when adding classes.
    /* console.log(navHeight); */
    /* logo.classList.remove("transparent-logo"); */
  } else {
    navbar.classList.remove("fixed-nav");
    /* logo.classList.add("transparent-logo"); */
  }
  if (scrollHeight > 1300) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }

  //if the value of window.pageYOffset > navbar.height, then change navbar class to be not transparent, and fixed.
});
//Problem created!:

// By adding the fixed navbar, we are now missing the sections as they are hidden
// behind the navbar when we smooth scroll to them using the internal site links.

// ********** smooth scroll ************
//Get all scrollLinks by class
const scrollLinks = document.querySelectorAll(".scroll-link");
//iterate over the links
scrollLinks.forEach(function (link) {
  //access each and every link with 'link' parameter.
  link.addEventListener("click", function (e) {
    //listen for click event
    //prevent the smooth scroll default behaviour, so we can customise it.
    e.preventDefault();
    //navigate to specific spot based on id
    const id = e.currentTarget.getAttribute("href").slice(1); //sclice takes a section of a string without modifying original string, (1) so start at index 1 i.e. ignore the '#'.
    //console.log(id);//logs the href value based on which button is clicked.
    const element = document.getElementById(id);

    //calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    //find if nav is fixed or not.
    const fixedNav = navbar.classList.contains("fixed-nav");

    let position = element.offsetTop - navHeight;
    //console.log(position);
    //if the nav is not fixed, take away the nav height from the position of the screen scroll.
    if (!fixedNav) {
      position = position - navHeight;
    }
    //if the container is open, accomodate for that on smaller screen sizes.
    //as the container only exits on small screen sizes i.e. phones.
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position, //navHeight is 82px.
    });
    linksContainer.style.height = 0;
  });
});

//using smooth scrolling, the href value of the link and the id of the place you want to scroll to must be identical.
