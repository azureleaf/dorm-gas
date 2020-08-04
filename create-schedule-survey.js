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

/**
 * A wrapper function
 * @param {undefined}
 * @return {undefined}
 */
function main() {
    makeBathCleanForm((year = 2019), (month = 5));
    Logger.log("File generated successfully!");
  }
  
  /**
   * Generate the form in the Google Drive
   * @param {number} year
   * @param {number} month
   * @return {undefined}
   */
  function makeBathCleanForm(year, month) {
    // Create the new form
    var form = FormApp.create(
      "風呂掃除当番希望調査（" + year + "年" + month + "月分）"
    );
  
    /**
     * Return the number of days in the specified month
     * @param {number} month
     * @param {number} year
     * @return {Date}
     */
    function getDaysInMonth(month, year) {
      // Note that:
      // Date() returns the last day of the month when the date is 0.
      // Date object assigns 0 for JAN, 1 for FEB, ... 11 for DEC.
      return new Date(year, month, 0).getDate();
    }
  
    /**
     * Return the array of readable dates
     * @param {number} month
     * @param {number} year
     * @return {String[]} Dates of the month; e.g. ["5月1日(水)", "5月2日(木)"... "5月31日(金)"]
     */
    function getDates(month, year) {
      const weekdays_ja = ["日", "月", "火", "水", "木", "金", "土"];
      const month_len = getDaysInMonth(month, year);
      var days = new Array(month_len);
      var firstDay = new Date(year, month - 1, 1); // The first day of the month. "-1" because the month index for JAN is 0
      var firstWeekday = firstDay.getDay(); // Weekday index of the first day of the month
      for (var i = 0; i < month_len; i++) {
        days[i] =
          month +
          "月" +
          (i + 1) +
          "日(" +
          weekdays_ja[(firstWeekday + i) % 7] +
          ")";
      }
  
      return days;
    }
  
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
  
    // Multiple choice selector for dates
    var item = form.addCheckboxItem();
    item.setTitle("当番をできない日がある場合、それらを全て選択してください。");
    item.setChoiceValues(getDates(month, year));
  
    Logger.log("Published URL: " + form.getPublishedUrl());
    Logger.log("Editor URL: " + form.getEditUrl());
  }