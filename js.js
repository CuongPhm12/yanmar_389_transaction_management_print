// var jexcelScript = document.createElement("script");
// jexcelScript.setAttribute("src","https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js");
// document.head.appendChild(jexcelScript);
// console.log($("#barcode"))
// JsBarcode("#code128", "Hi!");

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

(async () => {
  await loadScript(
    "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"
  );
  let barcode_text = document.getElementById("barcode_text").textContent;
  $("#barcode").JsBarcode(barcode_text.trim(), {
    format: "code39",
    //   lineColor: "#0aa",
    width: 2.6,
    height: 40,
    //   displayValue: false
  });
})();

let elements_1 = $(".sum-1");
let elements_2 = $(".sum-2");

let sum1 = 0;
let sum2 = 0;

//Tính tổng số lượng cột MRP
for (let i = 0; i < elements_1.length; i++) {
  let a = elements_1[i].innerText;
  a = parseFloat(a);

  if (isNaN(a)) {
    a = 0;
  }
  sum1 += a;
}

//Tính tổng số lượng cột theo chứng thực
for (let i = 0; i < elements_2.length; i++) {
  let a = elements_2[i].innerText;
  a = parseFloat(a.replace(",", ""));

  if (isNaN(a)) {
    a = 0;
  }
  sum2 += a;
}

$("#sum-1")[0].innerText = formatNumber(getNum(sum1));
$("#sum-2")[0].innerText = formatNumber(getNum(sum2));
$("#sum-1").css("font-weight", "bold");
$("#sum-2").css("font-weight", "bold");

let total_cost = sum2;
let total_cost_tax = sum2 * 0.1;
let total_cost_after_tax = total_cost + total_cost_tax;
$("#total_cost")[0].innerText = formatNumber(getNum(sum2));
$("#total_cost_tax")[0].innerText = formatNumber(getNum(total_cost_tax));
$("#total_cost_after_tax")[0].innerText = formatNumber(
  getNum(total_cost_after_tax)
);

//format định dạng số
function formatNumber(number) {
  // Chuyển số thành chuỗi
  let numStr = number.toString();

  // Tìm vị trí của dấu thập phân
  let decimalIndex = numStr.indexOf(".");

  // Nếu không có dấu thập phân, gán vị trí cuối cùng của chuỗi
  if (decimalIndex === -1) {
    decimalIndex = numStr.length;
  }

  // Duyệt qua chuỗi từ cuối về đầu và chèn dấu ',' sau mỗi ba chữ số
  for (let i = decimalIndex - 3; i > 0; i -= 3) {
    numStr = numStr.slice(0, i) + "," + numStr.slice(i);
  }

  // Trả về chuỗi đã định dạng
  return numStr;
}

function getNum(val) {
  if (isNaN(val)) {
    return 0;
  }
  return val;
}

//Xử lý lấp đầy khoảng trắng khi in
const count_tr_selector = $(".headergrid2 tbody tr");

let string = "";

for (let i = 1; i < 12 - count_tr_selector.length; i++) {
  string +=
    "<tr style='height: 15px;text-align: center;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
}

$("#data_table tbody tr:last-child").before(string);

// Function to add numbering to the 순번 column
function addSequenceNumbers() {
  // Get the tbody element
  var tbody = document
    .getElementById("data_table")
    .getElementsByTagName("tbody")[0];

  // Get all rows in the tbody
  var rows = tbody.getElementsByTagName("tr");

  // Iterate through the rows and add sequence number to the first cell
  for (var i = 1; i < rows.length - 1; i++) {
    var sequenceCell = rows[i].getElementsByTagName("td")[0];
    sequenceCell.textContent = i;
  }
}

// Function to duplicate tables if it exists
function duplicateTables() {
  // Duplicate the first table
  $("#header_table")
    .parent()
    .append($("#header_table").clone())
    .append($("#data_table").clone());
}

// Combined function to run both functions on window.onload
function onWindowLoad() {
  addSequenceNumbers();
  duplicateTables();
  $(".change_text:last").text("거래명세서(공급하는자용)");
  //   console.log( $(".change_text:last"))
}

// Call the combined function to add sequence numbers when the page loads
window.onload = onWindowLoad;
