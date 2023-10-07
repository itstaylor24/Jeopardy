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

let categoriesArr = [];

let structuredData = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

// function getCategoryIds(num) {
//   const catIdxs = randomizeSelection(fullCatArr, num);
//   const idArr = [];

//   catIdxs.forEach((val) => {
//     idArr.push(fullCatArr[val].id);
//   });
//   return idArr;
// }

function getCategoryIds() {}

getCategoryIds();

// getCategoryIds();

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

//
async function fillTable() {
  await setupAndStart();
  const table = $("table");

  //creating the table head
  const trHead = $("<tr>");
  // trHead.setAttribute("id", "categories");
  categoriesArr.forEach((d) => {
    const th = $(`<th>${d.title.toUpperCase()}</th>`);

    trHead.append(th);
  });
  table.append(trHead);

  let structuredData = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  structuredData.forEach((d) => {
    const trRow = $("<tr>");
    let td = "";
    for (let catIdx = 0; catIdx < categoriesArr.length; catIdx++) {
      const qna = categoriesArr[catIdx];

      for (let clueIdx = 0; clueIdx < qna.clues.length; clueIdx++) {
        structuredData[clueIdx[catIdx]] = qna.clues[clueIdx];
        td = $(`<td id =${qna.clues[clueIdx].id}>`);
        td.text("?");
      }
      trRow.append(td);

      table.append(trRow);
    }
  });
}

// });
// `${clue.question}`;
// `${clue.answer}`;

fillTable();

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function handleClick(evt) {
  $("td").on(
    "click",
    await fillTable()
    //   // for (let i = 0; i < categoriesArr.length; i++) {
    //   //   const c = categoriesArr[i];
    //   //   for (let j = 0; j < c.clues.length; j++) {
    //       structuredData[clueIdx][catIdx] = qna.clues[clueIdx];
    // if (qna.clues[clueIdx].showing === "null") {
    //   td.innerHTML === "?";
    // }
    // if (
    //   c.clues[clueIdx].showing === "null"
    //   // td.innerHTML === "?" &&
    //   document.getElementById(`${qna.clues[idx].id}`)
    // ) {
    //   td.innerHTML = qna.clues[idx].question;
    //   qna.clues[idx].showing = "question";
    // }
    // if ((td.innerHTML = qna.clues[idx].question)) {
    //   td.innerHTML = qna.clues[idx].answer;
    //   qna.clues[idx].showing = "answer";
    // } else {
    //   return;
  );
}

// handleClick();

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

// https://drive.google.com/drive/folders/1XuNgh5v9hN3GZg4vrYX6WpctPg7X43k_

async function setupAndStart() {
  // let categoriesArr = [];
  const baseUrl = "https://jservice.io/api";
  const res = await axios.get(baseUrl + "/categories?count=100");

  const sixCategories = _.sampleSize(res.data, 6);

  // let array = [];

  for (let category of sixCategories) {
    // get 5 questions for this category
    const catData = await axios.get(baseUrl + "/category?id=" + category.id);
    const cluesQNA = catData.data.clues.slice(0, 5);

    for (let clue of cluesQNA) {
      clue.showing = "null";
    }

    categoriesArr.push({
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

  return categoriesArr;
}
