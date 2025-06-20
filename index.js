// Khai báo toàn cục
let result = localStorage.getItem("result") || "";
let formula = localStorage.getItem("formula") || "";
let test = ["+", "-", "*", "/", "."];

const selectFeature = document.getElementById("selectFeature");
const returnCalculator = document.getElementById("returnCalculator");
const changeColor = document.getElementById("changeColor");
const featureHistory = document.getElementById("featureHistory");
const trashButton = document.getElementById("trash-button");
const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");
const column3 = document.getElementById("column3");
const listHistory = document.getElementById("listHistory");
const returnButton = document.getElementById("returnButton");

const two = document.getElementById("two");
const three = document.getElementById("three");
const one = document.getElementById("one");

document.addEventListener("DOMContentLoaded", getData);

// Nhập input
document
  .getElementById("numberDoubleZero-button")
  .addEventListener("click", () => {
    updateNumber("00");
    // 00
  });

document.getElementById("numberZero-button").addEventListener("click", () => {
  updateNumber("0");
  // 0
});

document.getElementById("numberOne-button").addEventListener("click", () => {
  updateNumber("1");
  // 1
});

document.getElementById("numberTwo-button").addEventListener("click", () => {
  updateNumber("2");
  // 2
});

document.getElementById("numberThree-button").addEventListener("click", () => {
  updateNumber("3");
  // 3
});

document.getElementById("numberFour-button").addEventListener("click", () => {
  updateNumber("4");
  // 4
});

document.getElementById("numberFive-button").addEventListener("click", () => {
  updateNumber("5");
  // 5
});

document.getElementById("numberSix-button").addEventListener("click", () => {
  updateNumber("6");
  // 6
});

document.getElementById("numberSeven-button").addEventListener("click", () => {
  updateNumber("7");
  // 7
});

document.getElementById("numberEight-button").addEventListener("click", () => {
  updateNumber("8");
  // 8
});

document.getElementById("numberNine-button").addEventListener("click", () => {
  updateNumber("9");
  // 9
});

document.getElementById("comma-button").addEventListener("click", () => {
  updateNumber(".");
  // ,
});

document.getElementById("plus-button").addEventListener("click", () => {
  updateNumber("+");
  // +
});

document.getElementById("minus-button").addEventListener("click", () => {
  updateNumber("-");
  // -
});

document.getElementById("multiply-button").addEventListener("click", () => {
  updateNumber("*");
  //*
});

document.getElementById("divide-button").addEventListener("click", () => {
  updateNumber("/");
  // /
});

document.getElementById("percent-button").addEventListener("click", () => {
  updateNumber("%");
  // %
});

document.getElementById("equal-button").addEventListener("click", () => {
  // =
  formula = checkLastValueInFormula();

  // If formula is not fill, return 0;
  if (formula === "") {
    return 0;
  } else {

    try {
      formula = eval(formula);

    } catch (error) {

      document.getElementById("displayTotal").innerHTML = "Lỗi biểu thức";
      return 0;
    }
    // Lưu kết quả vào key result
    saveResult(Number(formula));

    displayResult();

    createNewElement(formula, result);

    console.log(formula);
  }
});

document.getElementById("AC-button").addEventListener("click", () => {
  formula = "";
  result = "";

  localStorage.clear();

  displayFormula(formula);
  displayResult();
});

document.getElementById("delete-button").addEventListener("click", () => {
  formula = deleteOneLetter(formula);

  saveFormula(formula);

  displayFormula(formula);
  displayResult();

  console.log(formula);
});

function updateNumber(Value) {
  
  // if first value in formula is null, formula will not use Value in localStorage.getItem("formula") 
  if (formula === "") {
    formula += Value;
  } else {
    formula = localStorage.getItem("formula") + Value;
  }
  
  checkFirstValueInFormula();

  checkPercentValue();

  if (checkMinusAndMultiphyValue(formula) === true) {
    return 0;
  }

  checkTwoCases(Value);

  // Sau khi update, phải lưu giá trị ms dùng đc nút deleteRight
  saveFormula(formula);

  displayFormula(formula);
  console.log(formula);
}

// Check giá trị cuối cùng là cộng trừ nhân chia
function checkLastValueInFormula() {
  for (let i = 0; i < test.length; i++) {
    if (formula[formula.length - 1] === test[i]) {
      formula = deleteOneLetter(formula);
    }
  }
  return formula;
}

// Check giá trị đầu là cộng trừ nhân chia
function checkFirstValueInFormula() {
  if (
    formula[formula.length - 2] === undefined ||
    (formula[formula.length - 2] === "-" &&
      formula[formula.length - 3] === undefined)
  ) {
    if (formula[formula.length - 1] === "+") {
      formula = deleteOneLetter(formula);
      return 0;
    } else if (formula[formula.length - 1] === "*") {
      formula = deleteOneLetter(formula);
      return 0;
    } else if (formula[formula.length - 1] === "/") {
      formula = deleteOneLetter(formula);
      return 0;
    }
  }
}

// Check giá trị percent
function checkPercentValue() {
  if (formula[formula.length - 1] === "%") {
    for (let d = 0; d < formula.length; d++) {
      if (formula.charAt(d) === "%") {
        formula = formula.slice(0, -1) + "*0.01";
        document.getElementById("displayText").innerHTML = 1;
        saveFormula(formula);
        return 0;
      }
    }
  }
}

// Check gộp 2 trường hợp
function checkTwoCases(Value) {
  for (let j = 0; j < test.length; j++) {
    if (checkDoubleValueAndLastNumber(j, Value) === true) {
      return 0;
    }
    checkChangeVauleInFormula(j);
  }
}

//  lỗi lặp lại 2 lần dấu cộng trừ nhân chia và lỗi giá trị cuối cùng là số và lỗi dấu nhân và trừ thành dấu trừ
function checkDoubleValueAndLastNumber(j, Value) {
  if (formula[formula.length - 1] === test[j]) {
    for (let i = 0; i < formula.length; i++) {
      if (formula[formula.length - 1] === Value) {

        if ((formula[formula.length - 2] === formula[formula.length - 1]) && formula[formula.length -3] === "*") {
          formula = formula.slice(0,-3) + formula.slice(-1);
          saveFormula();
          return true;          
        }

        if (formula[formula.length - 2] === formula[formula.length - 1]) {
          formula = formula.slice(0, -1);
          saveFormula(formula);
          return true;
        }

      }
    }
  }
}

// Lỗi thay đổi giữa các dấu cộng trừ nhân chia
function checkChangeVauleInFormula(j) {
  if (formula[formula.length - 1] === test[j]) {
    for (let z = 0; z < test.length; z++) {
      if (formula[formula.length - 2] === test[z]) {
        formula = formula.slice(0, -2) + formula.slice(-1);
        saveFormula(formula);
      }
    }
  }
}

// check lỗi dấu trừ và dấu nhân
function checkMinusAndMultiphyValue(formula) {
  if (
    formula[formula.length - 1] === "-" &&
    formula[formula.length - 2] === "*"
  ) {
    saveFormula(formula);

    displayFormula(formula);

    return true;
  }
}

function deleteOneLetter(Value) {
  if (Value === Number(Value)) {
    Value = localStorage.getItem("formula").slice(0, -1);

    // reset lại giá trị của result
    result = "";
    saveResult(result);
  } else {
    Value = Value.slice(0, -1);
  }
  return Value;
}

function saveFormula(formula) {
  localStorage.setItem("formula", formula);
}

function saveResult(result) {
  localStorage.setItem("result", result);
}

// Display Formula And Result
function displayFormula(formula) {
  document.getElementById("displayText").innerHTML = formula;
}

function displayResult() {
  document.getElementById("displayTotal").innerHTML =
    localStorage.getItem("result");
}

// Display History

document.getElementById("navHistory").addEventListener("click", () => {
  selectFeature.classList.toggle("display");

  if (selectFeature.classList.contains("display")) {
    selectFeature.style.display = "none";
  } else {
    selectFeature.style.display = "block";
  }
});

selectFeature.addEventListener("click", async () => {
   if (document.getElementById("body").classList.contains("body-white")) {
    getDataWhite();
  } else if(document.getElementById("body").classList.contains("body-red")){
    getDataRed();
  } else {
    getData();
  }

  try {
    const response = await axios.get(
      "https://683d1a9f199a0039e9e436df.mockapi.io/Calculator"
    );

    if (response.data.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Không có lịch sử",
        text: "Error",
      });
      return 0;
    }
  } catch (error) { }

  returnCalculator.style.display = "inline-flex";
  changeColor.style.display = "none";
  featureHistory.style.display = "none";
  trashButton.style.display = "block";
  selectFeature.style.display = "none";
  column1.style.display = "none";
  column2.style.display = "none";
  column3.style.display = "none";
  listHistory.style.display = "block";
});

two.addEventListener("click", () => {
  changColorWhite();
  getDataWhite();
})

three.addEventListener("click", () => {
  changColorRed();
  getDataRed();
})

returnButton.addEventListener("click", () => {
  returnCalculator.style.display = "none";
  changeColor.style.display = "block";
  featureHistory.style.display = "block";
  trashButton.style.display = "none";
  column1.style.display = "inline-flex";
  column2.style.display = "inline-flex";
  column3.style.display = "inline-flex";
  listHistory.style.display = "none";
});

//-------------------------- API ----------------------------------
async function getData() {
  try {
    const response = await axios.get(
      "https://683d1a9f199a0039e9e436df.mockapi.io/Calculator"
    );

    const ul = document.querySelector(".list");
    ul.innerHTML = "";

    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    response.data.forEach((item) => {
      //Format Date
      const date = new Date(item.createdAt);
      const formatDate = date.toLocaleDateString();

      // Tạo thẻ li
      const li = document.createElement("li");

      // Gắn class item vào li
      li.className = "item";
      li.id = "item";
      // Gắn thằng con vào li
      li.innerHTML = `
        <div class="formula" id="formula">${item.formula}</div>
        <div class="result" id="result">${item.results}</div>
        <div class="Date" id="Date">${formatDate}</div>
      `;

      li.addEventListener("click", () => {
        handleDisplay(item.id, item.results);
      })

      // Gắn li vào ul
      ul.appendChild(li);
    });

  } catch (error) {
    console.log("Thất bại" + error);
  }
}

function createNewElement() {
  const newElement = {
    createdAt: new Date().toISOString(),
    formula: localStorage.getItem("formula"),
    results: localStorage.getItem("result"),
  };

  try {
    axios.post(
      "https://683d1a9f199a0039e9e436df.mockapi.io/Calculator",
      newElement
    );
    getData();
  } catch (error) {
    console.log("Thất bại" + error);
  }
}

trashButton.addEventListener("click", () => {
  handleDelete();
});

function handleDelete() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger mr-3",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.get(
          "https://683d1a9f199a0039e9e436df.mockapi.io/Calculator"
        );

        response.data.forEach(async (item) => {
          await axios.delete(
            `https://683d1a9f199a0039e9e436df.mockapi.io/Calculator/${item.id}`
          );
        });

        console.log(response.data);

        if (response.data.length > 0) {
          returnCalculator.style.display = "none";
          changeColor.style.display = "block";
          featureHistory.style.display = "block";
          trashButton.style.display = "none";
          column1.style.display = "inline-flex";
          column2.style.display = "inline-flex";
          column3.style.display = "inline-flex";
          listHistory.style.display = "none";
          formula = "";
          result = "";

          localStorage.clear();

          displayFormula(formula);
          displayResult();
        }

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "History has been deleted.",
          icon: "success",
        });

        document.querySelector(".list").innerHTML = "";
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: ":)))",
          icon: "error",
        });
      }
    });
}

async function handleDisplay(id, result) {
  await axios.put(`https://683d1a9f199a0039e9e436df.mockapi.io/Calculator/${id}`,
    displayFormula(result),
    saveFormula(result),
    saveResult(result),
    document.getElementById("displayTotal").innerHTML = ""
  );
}

function changColorWhite() {
  document.getElementById("body").classList.add("body-white");
  document.getElementById("container").classList.add("container-white");
  document.getElementById("one").classList.add("all-white");
  document.getElementById("two").classList.add("all-white");
  document.getElementById("three").classList.add("all-white");
  document.getElementById("navHistory").classList.add("navHistory-white");
  document.getElementById("displayText").classList.add("displayText-white");
  document.getElementById("displayTotal").classList.add("displayText-white");
  document.getElementById("AC-button").classList.add("white");
  document.getElementById("percent-button").classList.add("white");
  document.getElementById("delete-button").classList.add("white");
  document.getElementById("divide-button").classList.add("white");
  document.getElementById("multiply-button").classList.add("white");
  document.getElementById("minus-button").classList.add("white");
  document.getElementById("plus-button").classList.add("white");
  document.getElementById("equal-button").classList.add("white");
  selectFeature.classList.add("selectFeature-white");
  trashButton.classList.add("trash-button-white");
  // Red 
  document.getElementById("body").classList.remove("body-red");
  document.getElementById("container").classList.remove("container-red");
  document.getElementById("one").classList.remove("all-red");
  document.getElementById("two").classList.remove("all-red");
  document.getElementById("three").classList.remove("all-red");
  document.getElementById("navHistory").classList.remove("navHistory-red");
  document.getElementById("displayText").classList.remove("displayText-red");
  document.getElementById("displayTotal").classList.remove("displayTotal-red");
  document.getElementById("AC-button").classList.remove("red");
  document.getElementById("percent-button").classList.remove("red");
  document.getElementById("delete-button").classList.remove("red");
  document.getElementById("divide-button").classList.remove("red");
  document.getElementById("multiply-button").classList.remove("red");
  document.getElementById("minus-button").classList.remove("red");
  document.getElementById("plus-button").classList.remove("red");
  document.getElementById("equal-button").classList.remove("red");
  selectFeature.classList.remove("selectFeature-red");
  trashButton.classList.remove("trash-button-red");
}

async function getDataWhite() {
  try {
    const response = await axios.get(
      "https://683d1a9f199a0039e9e436df.mockapi.io/Calculator"
    );

    const ul = document.querySelector(".list");
    ul.innerHTML = "";

    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    response.data.forEach((item) => {
      //Format Date
      const date = new Date(item.createdAt);
      const formatDate = date.toLocaleDateString();

      // Tạo thẻ li
      const li = document.createElement("li");

      // Gắn class item vào li
      li.className = "item";
      li.classList.add("item-white");
      li.id = "item";
      // Gắn thằng con vào li
      li.innerHTML = `
          <div class="formula" id="formula">${item.formula}</div>
          <div class="result" id="result">${item.results}</div>
          <div class="Date" id="Date">${formatDate}</div>
        `;

      li.addEventListener("click", () => {
        handleDisplay(item.id, item.results);
      })

      // Gắn li vào ul
      ul.appendChild(li);
    });

  } catch (error) {
    console.log("Thất bại" + error);
  }
}

function changColorRed() {
  document.getElementById("body").classList.add("body-red");
  document.getElementById("container").classList.add("container-red");
  document.getElementById("one").classList.add("all-red");
  document.getElementById("two").classList.add("all-red");
  document.getElementById("three").classList.add("all-red");
  document.getElementById("navHistory").classList.add("navHistory-red");
  document.getElementById("displayText").classList.add("displayText-red");
  document.getElementById("displayTotal").classList.add("displayTotal-red");
  document.getElementById("AC-button").classList.add("red");
  document.getElementById("percent-button").classList.add("red");
  document.getElementById("delete-button").classList.add("red");
  document.getElementById("divide-button").classList.add("red");
  document.getElementById("multiply-button").classList.add("red");
  document.getElementById("minus-button").classList.add("red");
  document.getElementById("plus-button").classList.add("red");
  document.getElementById("equal-button").classList.add("red");
  selectFeature.classList.add("selectFeature-red");
  trashButton.classList.add("trash-button-red");
}

async function getDataRed() {
  try {
    const response = await axios.get(
      "https://683d1a9f199a0039e9e436df.mockapi.io/Calculator"
    );

    const ul = document.querySelector(".list");
    ul.innerHTML = "";

    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    response.data.forEach((item) => {
      //Format Date
      const date = new Date(item.createdAt);
      const formatDate = date.toLocaleDateString();

      // Tạo thẻ li
      const li = document.createElement("li");

      // Gắn class item vào li
      li.className = "item";
      li.classList.add("item-red");
      li.id = "item";
      // Gắn thằng con vào li
      li.innerHTML = `
          <div class="formula" id="formula">${item.formula}</div>
          <div class="result" id="result">${item.results}</div>
          <div class="Date" id="Date">${formatDate}</div>
        `;

      li.addEventListener("click", () => {
        handleDisplay(item.id, item.results);
      })

      // Gắn li vào ul
      ul.appendChild(li);
    });

  } catch (error) {
    console.log("Thất bại" + error);
  }
}

one.addEventListener("click", () => {
  document.getElementById("body").classList.remove("body-white");
  document.getElementById("container").classList.remove("container-white");
  document.getElementById("one").classList.remove("all-white");
  document.getElementById("two").classList.remove("all-white");
  document.getElementById("three").classList.remove("all-white");
  document.getElementById("navHistory").classList.remove("navHistory-white");
  document.getElementById("displayText").classList.remove("displayText-white");
  document.getElementById("displayTotal").classList.remove("displayText-white");
  document.getElementById("AC-button").classList.remove("white");
  document.getElementById("percent-button").classList.remove("white");
  document.getElementById("delete-button").classList.remove("white");
  document.getElementById("divide-button").classList.remove("white");
  document.getElementById("multiply-button").classList.remove("white");
  document.getElementById("minus-button").classList.remove("white");
  document.getElementById("plus-button").classList.remove("white");
  document.getElementById("equal-button").classList.remove("white");
  selectFeature.classList.remove("selectFeature-white");
  trashButton.classList.remove("trash-button-white");
  document.getElementById("body").classList.remove("body-red");
  document.getElementById("container").classList.remove("container-red");
  document.getElementById("one").classList.remove("all-red");
  document.getElementById("two").classList.remove("all-red");
  document.getElementById("three").classList.remove("all-red");
  document.getElementById("navHistory").classList.remove("navHistory-red");
  document.getElementById("displayText").classList.remove("displayText-red");
  document.getElementById("displayTotal").classList.remove("displayTotal-red");
  document.getElementById("AC-button").classList.remove("red");
  document.getElementById("percent-button").classList.remove("red");
  document.getElementById("delete-button").classList.remove("red");
  document.getElementById("divide-button").classList.remove("red");
  document.getElementById("multiply-button").classList.remove("red");
  document.getElementById("minus-button").classList.remove("red");
  document.getElementById("plus-button").classList.remove("red");
  document.getElementById("equal-button").classList.remove("red");
  selectFeature.classList.remove("selectFeature-red");
  trashButton.classList.remove("trash-button-red");
})
