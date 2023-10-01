// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds(arr) {
  const categoryIds = [];
  arr = await setupAndStart();
  for (let idNum of arr) {
    categoryIds.push(idNum.id);
  }
  return categoryIds;
}

/** Return object with data about a category:
 
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  newArr = await setupAndStart();

  for (let cat of newArr) {
    if (cat.id === catId) {
      return cat;
    }
  }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids [1,2,3,4,5,6]
 * - get data for each category [data1, data2...data6]
 * - create HTML table
 * */

async function setupAndStart() {
  const baseUrl = "https://jservice.io/api";
  const res = await axios.get(baseUrl + "/categories?count=100");

  const sixCategories = _.sampleSize(res.data, 6);

  let array = [];

  for (let category of sixCategories) {
    // get 5 questions for this category
    const catData = await axios.get(baseUrl + "/category?id=" + category.id);
    const clues = catData.data.clues.slice(0, 5);

    array.push({
      title: category.title,
      clues,
    });
  }

  const body = document.querySelector("body");
  let ths = "";
  for (let i = 0; i < array.length; i++) {
    ths += `<th>${array[i].title}</th>`;
  }

  // put categories on table head
  body.innerHTML += `
    <table>
       <thead>
        <tr>
          ${ths}
         </tr>
      </thead>
  `;

  body.innerHTML += "</table>";

  // why += and not +?
  console.log(array);
  // `<table>
  // <thead>
  // <tr>
  // <th></th>
  // <th></th>
  // <th></th>
  // <th></th>
  // <th></th>
  // <th></th>
  // </tr>
  // </thead>
  // <tbody>
  // <tr>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // </tr>
  // <tr>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // </tr>
  // <tr><
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // /tr>
  // <tr>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // </tr>
  // <tr>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // </tr>
  // <tr>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // <td></td>
  // </tr>
  // </tbody>
  // </table>`;
  return array;
}

setupAndStart();

// function produceTH() {}

/** On page load, add event handler for clicking clues */

// TODO
