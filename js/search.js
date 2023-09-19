// search by country name
const form = document.getElementById("form")["form__input"];
//

form.addEventListener("input", function (e) {
  const name = document.querySelectorAll(".country-name");
  const arr = [];
  const val = this.value;
  name.forEach((item) => {
    arr.push(item.textContent);
  });

  closeAllLists();
  if (!val) {
    return false;
  }
  let currentFocus = -1;
  const inpDiv = document.createElement("div");
  inpDiv.setAttribute("id", this.id + "autocomplete-list");
  inpDiv.setAttribute("class", "autocomplete-items");
  this.parentNode.appendChild(inpDiv);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
      const b = document.createElement("div");
      b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
      b.innerHTML += arr[i].substr(val.length);
      b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
      b.addEventListener("click", function (e) {
        form.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
      });
      inpDiv.appendChild(b);
    }
  }
  form.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elment) {
    let x = document.getElementsByClassName("autocomplete-items");

    const inputValue = form.value.toLowerCase();
    const name = document.querySelectorAll(".country-name");

    name.forEach((item) => {
      if (item.textContent.toLowerCase().includes(inputValue)) {
        item.parentElement.classList.remove("hidden");
      } else {
        item.parentElement.classList.add("hidden");
      }
    });

    for (let i = 0; i < x.length; i++) {
      if (elment != x[i] && elment != form) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
});
// scroll btn

const scrollBtn = document.getElementById("scroll-btn");
document.addEventListener("scroll", () => {
  if (window.scrollY) {
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});
