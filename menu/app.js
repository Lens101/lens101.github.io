//array of objects.
//note commas, seperating each entry.
//Mimic AJAX respsonse by storing local data.
const menu = [
    {
        id: 1,
        title: "buttermilk pancakes",
        category: "breakfast",
        price: 15.99,
        img: "./images/item-1.jpeg",
        desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
        id: 2,
        title: "diner double",
        category: "lunch",
        price: 13.99,
        img: "./images/item-2.jpeg",
        desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
        id: 3,
        title: "godzilla milkshake",
        category: "shakes",
        price: 6.99,
        img: "./images/item-3.jpeg",
        desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
        id: 4,
        title: "country delight",
        category: "breakfast",
        price: 20.99,
        img: "./images/item-4.jpeg",
        desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
        id: 5,
        title: "egg attack",
        category: "lunch",
        price: 22.99,
        img: "./images/item-5.jpeg",
        desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
        id: 6,
        title: "oreo dream",
        category: "shakes",
        price: 18.99,
        img: "./images/item-6.jpeg",
        desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
        id: 7,
        title: "bacon overflow",
        category: "breakfast",
        price: 8.99,
        img: "./images/item-7.jpeg",
        desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
        id: 8,
        title: "american classic",
        category: "lunch",
        price: 12.99,
        img: "./images/item-8.jpeg",
        desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
        id: 9,
        title: "quarantine buddy",
        category: "shakes",
        price: 16.99,
        img: "./images/item-9.jpeg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 10,
        title: "Fillet steak",
        category: "dinner",
        price: 35.99,
        img: "./images/item-10.jpeg",
        desc: `steak dinner steak dinner steak dinnersteak dinnersteak dinner steak dinner steak dinner steak dinner `,
    },
];

//Target the parent tag of all the menu items.
const sectionCenter = document.querySelector(".section-center");
//Target button container
const btnContainer = document.querySelector(".btn-container");

//Display all items on page load
//'DOMContentLoaded' means when the page loads, perform this function.
window.addEventListener('DOMContentLoaded', function () {
    displayMenuItems(menu);
    //allows for dynamic addition of buttons based on what unique categories are present in the menu array.
    displayMenuButtons(); 

});

//display the all the items on the menu.
function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) { //.map is an array method

        //console.log(item);//This will log the 'menu' array indiviually as objects.

        //Returning template literals with variable substitution directly into the HTML. 
        //Syntax: ${param.property}
        //use backticks to directly input the HTML dynamically, i.e. this would change if the menu changed also.
        return `<article class="menu-item">
        <img src = ${item.img} class="photo" alt="menu-item">
        <div class="item-info">
          <header>
            <h4> ${item.title} </h4>
            <h4 class="price"> ${item.price} </h4>
          </header>
          <p class="item-text"> ${item.desc} </p>
        </div>
      </article>`;

    });

    //.join() returns a string from the menu array which is now an array of HTML elements.
    displayMenu = displayMenu.join(""); //empty string necessary otherwise there will be commas seperating each object in the array.

    sectionCenter.innerHTML = displayMenu;
    //console.log(displayMenu); - Logs everything with the HTML tags embedded.
}

function displayMenuButtons() {
    const categories = menu.reduce(

        //values is a string array (defined by ['all'] at the bottom of the .reduce function),
        //item is each object in the menu array, allowing us to access individual properties by syntax: item.property.
        function (values, item) {

            //add all unique item.categories to values array.
            if (!values.includes(item.category)) {
                values.push(item.category);
            }
            return values;
        },
        ['all'] //return as an array with the initial value already containing 'all' because 'all' isn't a category type in the menu array of objects.
    );

    const categoryBtns = categories.map(function (category) {

        //return a button for each unique value present in menu.categories, with a name the same as the category. ToUpperCase() and regex could be applied here if necessary.

        return `<button class="filter-btn"
         type="button" data-id=${category}>${category}</button> `
    })
        .join("");  //again, join("") necessary otherwise commas would be present in the button container between the buttons.

    btnContainer.innerHTML = categoryBtns; //serve these buttons to the page.

    //target the buttons, must be targetted after they are created, as they are now created dynamically in th JS, and not in the HTML.
    const filterBtns = document.querySelectorAll(".filter-btn");

    //filter menu items based on button click
    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {

            //console.log(e.currentTarget.dataset.id);
            //sets category (on click) as the current button dataset id taken from the HTML classname.
            const category = e.currentTarget.dataset.id;


            //returns array of objects that have same menu.category as 'category' on each click event.
            const menuCategory = menu.filter(function (menuItem) {

                //Returns the items only if the object category matches the dataset-id on the button.
                if (menuItem.category === category) {
                    return menuItem;
                }
            });
            //console.log(menuCategory);

            /*
            As none of the objects have a category of 'all' we would have to redo 
            the template literal call if we didn't put that in a seperate function
            because .filter() can only filter by the categories present!
            */

            if (category === "all") {
                displayMenuItems(menu); //call with everything!
            } else {
                displayMenuItems(menuCategory); //call with specific categories.
            }
        });
    });

}
/*
Array.join()
The join() method creates and returns a new string by concatenating all of the elements in an
array (or an array-like object), separated by commas or a specified separator string.
If the array has only one item, then that item will be returned without using the separator.


Array.map()

.map() creates a new array by performing a function on each array element
.map() doesn't execute the function for array elements without values.
.map() doesn't change the original array.


Array.filter()

The filter() method creates a new array with all elements that pass the test
implemented by the provided function.

Array.reduce()

The reduce() method executes a user-supplied “reducer” callback function on each element of the array,
passing in the return value from the calculation on the preceding element.
The final result of running the reducer across all elements of the array is a single value.



If you add something dynamically, you can only access it once it has been added to the DOM/HTML.
*/

