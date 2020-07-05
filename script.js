const list = document.querySelector("ul");
const content = document.querySelector(".contents");
const li = document.querySelector("li");
const checkbox = document.querySelector(".cb");
const addButton = document.querySelector(".button");
const textinput = document.querySelector("textinput");
let completeOnOff = false;

function addComplete(content, checkbox) {
  if (!content.classList.contains("complete")) {
    content.classList.add("complete");
    completeOnOff = true;
  } else if (content.classList.contains("complete")) {
    content.classList.remove("complete");
    completeOnOff = false;
  }

  if (checkbox.type === "checkbox") {
    if (completeOnOff === true) {
      checkbox.checked = true;
    } else if (completeOnOff === false) {
      checkbox.checked = false;
    }
  }
}

addButton.addEventListener("click", () => {
  if (!textinput) {
    alert("정보를 입력하세요");
  }
});

li.addEventListener("click", (e) => {
  switch (e.target.className) {
    case "contents":
      addComplete(e.target, checkbox);
      break;
    case "cb":
      addComplete(content, e.target);
      break;
  }
});
