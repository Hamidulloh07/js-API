let elForm = $('.content-form');
let elList = $(".content-list");
let elTemp = $("#content-template").content;
let elSpinner = $(".content-spinner");
let elInp = elForm.querySelector(".content-input");
let elModalBtn = document.querySelector(".modal-button")
let elModal = document.querySelector(".modall");
let elModalBody = elModal.querySelector(".modal-body");
let elModalTitle = elModal.querySelector(".modal-title");
let elPoupulation = $(".class-modal1", elModal)
let elReg = $(".class-modal2", elModal)
let elThree = $(".class-modal3", elModal)

let countrties = [];

function funData(datum) {
  elList.innerHTML = "";

  let elCreateFragment = document.createDocumentFragment();
  datum.forEach(data => {
    let newFrgment = elTemp.cloneNode(true);
    let resultTemp = newFrgment.querySelector(".content-item");
    $(".content-img", resultTemp).src = data.flags.png;
    $(".content-img", resultTemp).href = data.name.common;
    $(".content-title", resultTemp).textContent = data.name.common;
    $(".btn-primary", resultTemp).value = data.cca2;
    elCreateFragment.append(resultTemp);
  })

  elList.append(elCreateFragment);
}

function inpSearchCntry(contryName) {
  fetch(`https://restcountries.com/v3.1/name/${contryName}`)
    .then(res => {
      if (res.status != 200) {
        throw new Error(newErrorFun("Davlatni noto'gri kirittingiz"));
      }
      return res.json();
    })
    .then(data => {
      countrties = data;
      funData(data)
    })
    .finally(function spinnedAdd() {
      elSpinner.classList.add("d-none");
    });
}

function spinnnewerRemove() {
  elSpinner.classList.remove("d-none")
}
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  spinnnewerRemove()
  let inputValue = elInp.value.toLowerCase().trim();
  inpSearchCntry(inputValue);
})

function newErrorFun(newErr) {
  let newErrItem = document.createElement("li");
  elList.innerHTML = "";
  newErrItem.textContent = newErr;
  elList.appendChild(newErrItem);
}

elList.addEventListener("click", (e) => {
  if (e.target.matches(".js-query")) {
    const countryCode = e.target.value;
    const currentCountry = countrties.find(
      (counrty) => counrty.cca2 == countryCode
    );
    elModalBody.textContent = currentCountry.capital;
    elModalTitle.textContent = currentCountry.name.common
    elPoupulation.textContent = `Population ${currentCountry.population}`
    elReg.textContent = currentCountry.subregion
  }
});