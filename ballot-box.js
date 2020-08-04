/**
 * This Google Apps Script generates the schedule survey
 * for bath cleaning inside the Google Drive.
 *
 * Usage:
 *      Put this file in the
 *    Specify the year & month inside the main() fucntion.
 *    Run the script.
 * External Dependencies:
 *    None
 */

// Questions to be putted to the vote
var agendas = [
  { question: "新しい洗濯機を購入すべきか？", options: ["賛成", "反対"] },
  {
    question: "コンパ費を増額すべきか？",
    options: ["変えない", "+10000", "+30000"],
  },
];

/**
 * Generate the form in the Google Drive
 * @param {number} year
 * @param {number} month
 * @return {undefined}
 */
function main(year, month) {
  // Create the new form
  var today = new Date();
  var form = FormApp.create(
    "寮生大会投票（" +
      today.getFullYear() +
      "年" +
      (today.getMonth() + 1) +
      "月" +
      today.getDate() +
      "日）"
  );

  // Dropdown selector for room numbers
  var item = form.addListItem();
  item.setTitle("部屋番号を選択してください。");
  item.setRequired(true);
  rooms = [];
  for (var i = 0; i < 40; i++) {
    // for-loop & push may take looong time; need to be modified later
    rooms.push(i + 101);
  }
  for (var i = 0; i < 40; i++) {
    rooms.push(i + 201);
  }
  item.setChoiceValues(rooms);

  // Text area for the applicant name
  // Required because the applicant may choose the wrong room number by mistake
  var item = form.addTextItem();
  item.setTitle("氏名を記入してください。");
  item.setRequired(true);

  // Add voting section for agendas
  agendas.forEach(function (agenda, index) {
    var item = form.addListItem();
    item.setTitle("議題" + (index + 1) + "：　" + agenda.question);
    item.setRequired(true);
    item.setChoiceValues(agenda.options);
  });

  Logger.log("Published URL: " + form.getPublishedUrl());
  Logger.log("Editor URL: " + form.getEditUrl());
}
