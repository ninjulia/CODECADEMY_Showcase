/**
 * This script is for the skip link and to ensure that moving focus
 * via hashchange is respected in all browsers.
 */
window.addEventListener(
  "hashchange",
  function (e) {
    if (location.hash.substring(1) !== "") {
      var el = document.getElementById(location.hash.substring(1));

      if (el) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(el.tagName)) {
          el.tabIndex = -1;
        }
        el.focus();
      }
    }
  },
  false
);

let body = document.getElementsByTagName("body")[0];
let footer = document.getElementsByTagName("footer")[0];
const modal = document.getElementById("modal_1");
const workContainer = document.getElementsByClassName("work")[0];
const clickItem = document.getElementById("item1");
const expand = document.getElementsByClassName("title");

/////// Portfolio acordion slider for screens below 1024w
function slider() {
  for (let i = 0; i < expand.length; i++) {
    if (expand[i].hasAttribute("data-modal-open")) {
      expand[i].setAttribute("data-modal-open", "");
    }
    expand[i].addEventListener("click", function () {
      // flip caret on click
      this.children[1].classList.toggle("flip");

      //toggle details
      const details = this.nextElementSibling;

      if (details.style.maxHeight) {
        details.style.maxHeight = null;
      } else {
        details.style.maxHeight = details.scrollHeight + "px";
        details.style.height = "auto";
        details.classList.add("wrapper");
      }
    });
    //////////////Allow Tab+Enter to open acordion
    expand[i].addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        expand[i].click();
      }
    });
  }
}

function popModal() {
  //get modal
  const modal = document.getElementById("modal_1");
  //get inner modal
  const modalContent = document.getElementById("modalInner");

  for (let i = 0; i < expand.length; i++) {
    //check if data attr is present, add back if not
    expand[i].setAttribute("data-modal-open", "modal_1");

    //add event listener to each portfolio item
    expand[i].addEventListener("click", function () {
      //get content to populate in modal
      let postContent = document.createDocumentFragment();
      postContent.appendChild(expand[i].previousElementSibling.cloneNode(true));
      postContent.appendChild(expand[i].cloneNode(true));
      postContent.appendChild(expand[i].nextElementSibling.cloneNode(true));
      modalContent.appendChild(postContent);

      //only post if modal open
      modal.addEventListener("focusout", (event) => {
        //leaves exit button for next modal open
        while (modalContent.children.length > 1) {
          modalContent.removeChild(modalContent.lastChild);
        }
      });
    });
  }
}

//compare portfolio item size to work container
function checkSize() {
  if (clickItem.offsetWidth != workContainer.offsetWidth) {
    //use modal display for portfolio details
    popModal();
  } else {
    slider();
  }
}

//wait until document load to do anything
document.addEventListener("DOMContentLoaded", () => {
  //check size onload
  checkSize();
  //check size on resize
  window.addEventListener("resize", checkSize);
});

/////form
const formButton = document.getElementById("send");
const contact = document.getElementById("contactSection");
formButton.addEventListener("click", updateForm);

function updateForm() {
  contact.innerHTML = `<div id="content" class="wrapper">
            <h2>Form Submitted</h2>
            <p>now you've done it</p>
        </div>`;
}
