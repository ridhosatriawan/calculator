const number = document.querySelectorAll("#number");
const operational = document.querySelectorAll("#operational");
const other = document.querySelectorAll("#other");
const display1 = document.getElementById("display1");
const display2 = document.getElementById("display2");

let arr1 = [];
let arr2 = [];
let temp = [];
let prevType = "";

function prevStr() {
  let str = display1.innerHTML.slice(display1.innerHTML.length - 1);
  return str;
}

function delLast() {
  let text = display1.innerHTML.slice(0, -1);
  display1.innerHTML = text;
}

function del() {
  delLast();
  if (isNaN(prevStr()) === true) {
    prevType = "opr";
  } else {
    prevType = "num";
  }
}

function delAll() {
  display1.innerHTML = "";
  display2.innerHTML = "";
}

number.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (prevStr() != "%") {
      display1.innerHTML += btn.innerText;
      prevType = "num";
    } else {
      prevType = "otr";
    }
  });
});

operational.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (prevType === "opr") {
      delLast();
      display1.innerHTML += btn.innerText;
    } else {
      display1.innerHTML += btn.innerText;
      prevType = "opr";
    }
  });
});

other.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (prevStr() != "%" && isNaN(prevStr()) != true) {
      display1.innerHTML += btn.innerText;
      prevType = "otr";
    }
  });
});

function splitString() {
  let temp;
  for (let i = 0; i < display1.innerText.length; i++) {
    if (!isNaN(display1.innerText.charAt(i))) {
      if (arr1.length === 0) {
        arr1.push(display1.innerText.charAt(i));
      } else {
        if (isNaN(display1.innerText.charAt(i - 1))) {
          arr1.push(display1.innerText.charAt(i));
        } else {
          temp = arr1[arr1.length - 1] += display1.innerText.charAt(i);
          arr1.pop();
          arr1.push(temp);
          temp = "";
        }
      }
    } else if (display1.innerText.charAt(i) != "%") {
      arr1.push(display1.innerText.charAt(i));
    } else {
      temp = arr1[arr1.length - 1] += display1.innerText.charAt(i);
      arr1.pop();
      arr1.push(temp);
      temp = "";
    }
  }
  execute();
}

function execute() {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].includes("%")) {
      percent(arr1[i], i);
    }
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === "x" || arr1[i] === "/") {
      if (arr1[i] === "x") {
        count(i, "*");
        i = 0;
      } else {
        count(i, "/");
        i = 0;
      }
    }
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === "-" || arr1[i] === "+") {
      if (arr1[i] === "-") {
        count(i, "-");
        i = 0;
      } else {
        count(i, "+");
        i = 0;
      }
    }
  }

  display2.innerHTML = arr1.toLocaleString();
  arr1 = [];
}

function percent(str, index) {
  const num = str.slice(0, -1);
  const result = parseFloat(num) / 100;
  arr1.splice(index, 1);
  arr1.splice(index, 0, result);
}

function oper(str, prev, next) {
  if (str === "*") {
    return prev * next;
  } else if (str === "/") {
    return prev / next;
  } else if (str === "+") {
    return prev + next;
  } else if (str === "-") {
    return prev - next;
  }
}

function count(index, opr) {
  const prev = parseFloat(arr1[index - 1]);
  const next = parseFloat(arr1[index + 1]);
  const result = oper(opr, prev, next);
  arr1.splice(index - 1, 3);
  arr1.splice(index - 1, 0, result);
}
