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

function getCategoryIds() {}

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

function getCategory(catId) {}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

// async function fillTable(HTMLdata) {
//   HTMLdata = await setupAndStart();
//   console.log(HTMLdata);
//   const table = $("table");
//   const tHead = $("<thead>");
//   const trHead = $("<tr>");
//   const th1 = $("<th>");
//   const th2 = $("<th>");
//   const th3 = $("<th>");
//   const th4 = $("<th>");
//   const th5 = $("<th>");
//   const th6 = $("<th>");
//   const tbody = $("<tbody>");
//   const tr1 = $("<tr>");
//   const tr2 = $("<tr>");
//   const tr3 = $("<tr>");
//   const tr4 = $("<tr>");
//   const tr5 = $("<tr>");

//   table.append(tHead, tbody);
//   tHead.append(trHead);
//   trHead.append(th1, th2, th3, th4, th5, th6);
//   tbody.append(tr1, tr2, tr3, tr4, tr5);

//   ths = [th1, th2, th3, th4, th5, th6];

//   const categoryArr = [];

//   for (let i = 0; i < HTMLdata.length; i++) {
//     console.log(HTMLdata[i]);
//     categoryArr.push(HTMLdata[i].title);
//     for (let j = 0; j < ths.length; j++) {
//       if (i === j) {
//         ths[j].text(`${categoryArr[i]}`);
//         ths[j].attr("id", HTMLdata[i].id);
//       }
//     }
//   }

//   const trs = [tr1, tr2, tr3, tr4, tr5];

//   for (let tr of trs) {
//     $("<td class='col-1'></td>").appendTo(tr);
//     $("<td class='col-2'></td>").appendTo(tr);
//     $("<td class='col-3'></td>").appendTo(tr);
//     $("<td class='col-4'></td>").appendTo(tr);
//     $("<td class='col-5'></td>").appendTo(tr);
//     $("<td class='col-6'></td>").appendTo(tr);

//     const col1 = Array.from($(".col-1"));

//     col1QNA = [];

//     const col2 = Array.from($(".col-2"));
//     col2QNA = [];

//     const col3 = Array.from($(".col-3"));
//     col3QNA = [];

//     const col4 = Array.from($(".col-4"));
//     col4QNA = [];

//     const col5 = Array.from($(".col-5"));
//     col5QNA = [];

//     const col6 = Array.from($(".col-6"));
//     col6QNA = [];

//     for (let clueObj of HTMLdata) {
//       const cluesInfo = clueObj.clues;
//       for (let clueInfo of cluesInfo) {
//         if ((clueInfo.showing = "null")) {
//           $("td").text("?");
//         }
//       }
//     }
//   }
// }
async function fillTable(HTMLdata) {
  HTMLdata = await setupAndStart();
  const table = $("table");

  //creating the table head
  const trHead = $("<tr>");
  HTMLdata.forEach((d) => {
    const th = $(`<th>${d.title}</th>`);
    trHead.append(th);
  });
  table.append(trHead);

  // structure the data
  const structuredData = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  for (let i = 0; i < HTMLdata.length; i++) {
    const c = HTMLdata[i];
    for (let j = 0; j < c.clues.length; j++) {
      structuredData[j][i] = c.clues[j];
    }
  }

  // obendesmond2@gmail

  structuredData.forEach((d) => {
    const trRow = $("<tr>");
    d.forEach((clue) => {
      const th = $(`<td>
        <div><p class="mark">?</p></div>
      </td>`);
      trRow.append(th);
    });
    table.append(trRow);
  });
}
// $(`<td>
//        <div><p class="mark">?</p></div>
//       </td>`);
// `<td>${clue.question}<td>`;
// `<td>${clue.answer}<td>`;

fillTable();
//

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

// input.addEventListener("keyup", searchHandler);

// suggestions.addEventListener("click", useSuggestion);

function handleClick(evt) {
  $("td").on("click", fillTable);
}

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
    const cluesQNA = catData.data.clues.slice(0, 5);

    for (let clue of cluesQNA) {
      clue.showing = "null";
    }

    array.push({
      title: category.title,
      clues: cluesQNA,
      id: category.id,
    });
  }

  // prepend table as first child of body
  const table = $("<table>");
  $("body").prepend(table);

  // add heading and button
  const h1 = $("<h1>Jeopardy!</h1>");
  const btn = $("<button>Start!</button>");
  $("body").prepend(btn);
  $("body").prepend(h1);

  return array;
}

//

//

// tds = $("td");
// tdArray = Array.from(tds);

// const col1 = tdArray.filter(function (el) {
//       (el.hasClass("col-1"));
//   });
// if (tdArray[i].hasClass("col-1")) {

// }

//

// async function setupAndStart() {
//   const baseUrl = "https://jservice.io/api";
//   const res = await axios.get(baseUrl + "/categories?count=100");

//   const sixCategories = _.sampleSize(res.data, 6);

//   let array = [];

//   for (let category of sixCategories) {
//     // get 5 questions for this category
//     const catData = await axios.get(baseUrl + "/category?id=" + category.id);
//     const clues = catData.data.clues.slice(0, 5);

//     array.push({
//       title: category.title,
//       clues,
//       id: category.id,
//     });
//   }

//   const body = document.querySelector("body");
//   let ths = "";
//   for (let i = 0; i < array.length; i++) {
//     ths += `<th>${array[i].title}</th>`;
//   }

//   // put categories on table head
//   body.innerHTML += `
//     <table>
//        <thead>
//         <tr>
//           ${ths}
//          </tr>
//       </thead>
//   `;

//   body.innerHTML += "</table>";
//   ths = "";

//
//
/** On page load, add event handler for clicking clues */

// TODO
