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
const h1 = $("<h1>Jeopardy!</h1>");
const btn = $("<button>Start!</button>");
$("body").prepend(btn);
$("body").prepend(h1);

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const baseUrl = "https://jservice.io/api";
  const res = await axios.get(baseUrl + "/categories?count=100");

  const sixCategories = _.sampleSize(res.data, 6);
  const catIds = sixCategories.map((category) => category.id);

  return catIds;
}

getCategoryIds();

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
  const catData = await axios.get(
    `https://jservice.io/api/category?id=${catId}`
  );

  const cluesQNA = catData.data.clues.slice(0, 5);
  for (let clue of cluesQNA) {
    clue.showing = "null";
  }

  return {
    title: catData.data.title,
    clues: cluesQNA,
  };
}
/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

//
function fillTable() {
  const $table = $("<table>");
  const $tHead = $("<thead>");
  const $tbody = $("<tbody>");

  //creating the table head
  const $trHead = $("<tr>");
  // trHead.setAttribute("id", "categories");
  categories.forEach((category) => {
    const $th = $(`<th>${category.title.toUpperCase()}</th>`);

    $trHead.append($th);
  });
  $tHead.append($trHead);
  $table.append($tHead, $tbody);

  $("body").append($table);

  for (let clueIdx = 0; clueIdx < 5; clueIdx++) {
    let $trRow = $("<tr>");
    for (let catIdx = 0; catIdx < categories.length; catIdx++) {
      $trRow.append($("<td>").attr("id", `${catIdx}-${clueIdx}`).text("?"));
    }
    $tbody.append($trRow);
  }
}

// fillTable();

// });
// `${clue.question}`;
// `${clue.answer}`;

// fillTable();

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function handleClick(evt) {
  let id = evt.target.id;

  let [catId, clueId] = id.split("-");
  let clue = categories[catId].clues[clueId];
  let show;

  if (clue.showing === "null") {
    show = clue.question;
    clue.showing = "question";
  } else if (clue.showing === "question") {
    show = clue.answer;
    clue.showing = "answer";
  } else {
    return;
  }

  $(`#${catId}-${clueId}`).html(show);
}

// handleClick();

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

// }

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
  catsInfo = await getCategoryIds();

  for (let catInfo of catsInfo) {
    categories.push(await getCategory(catInfo));
  }
  fillTable();
}

$("body").on("click", "td", handleClick);

async function start() {
  btn.on("click", function () {
    if (btn.html("Start!")) {
      btn.html("Restart");
    } else {
      btn.html("Start!");
    }
    setupAndStart();
  });
}

start();
