export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/main/main.html")
    .then((response) => response.text())
    .then((mainHtml) => {
      content.innerHTML = mainHtml;
      generateDynamicContent();
      fetchActivity();
    });
};


async function generateDynamicContent(){
  const button = document.querySelector("#randomizer");
  const filterButton = document.querySelector("#filterButton");
  button.innerText = "Randomize activity";
  button.addEventListener("click", fetchActivity)
  const fnmap = {
    'toggle': 'toggle',
      'show': 'add',
      'hide': 'remove'
  };
  
  const collapse = (selector, cmd) => {
    const targets = Array.from(document.querySelectorAll(selector));
    targets.forEach(target => {
      target.classList[fnmap[cmd]]('show');
    });
  }
  
  const triggers = Array.from(document.querySelectorAll(`[data-toggle="collapse"]`));
  // Listen for click events, but only on our triggers
  window.addEventListener('click', (ev) => {
    const elm = ev.target;
    if (triggers.includes(elm)) {
      const selector = elm.getAttribute('data-target');
      collapse(selector, 'toggle');
    }
  }, false);

  prepareFilterForm();
}

function fetchActivity(){
  const label = document.querySelector("#activityLabel");
  const image = document.querySelector("img");
  const link = document.querySelector("#linkForDetails");
  fetch(`${window.apiUrl}api/activity`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.activity == undefined){
      label.innerText = "An error has occured! Please contact the developers."
      image.src = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
      link.href = "/";
    }
    else{
    label.innerText = data.activity;
    image.src = data.imageUrl;
    link.href = "/#/activity/" + data.id;
    }
  }
  );
}


function prepareFilterForm(){
  const form = document.querySelector(".form-inline");
  const type = document.querySelector("#pref-type");
  const accessibility = document.querySelector("#pref-accessibility");
  const duration = document.querySelector("#pref-duration");
  const minPrice = document.querySelector("#minprice");
  const maxPrice = document.querySelector("#maxprice");
  const minParticipants = document.querySelector("#minparticipants");
  const maxParticipants = document.querySelector("#maxparticipants");
  form.addEventListener("submit", 
  (event) => fetchFiltered(event, type, accessibility, duration, minPrice, maxPrice, minParticipants, maxParticipants))
}

function fetchFiltered(event, type, accessibility, duration, minPrice, maxPrice, minParticipants, maxParticipants){
  let attributeString = "?"
  if(type.value != "-"){
    attributeString += "type=" + type.value + "&";
  }
  if(accessibility.value != "-"){
    attributeString += "accessibility=" + accessibility.value + "&";
  }
  if(duration.value != "-"){
    attributeString += "duration=" + duration.value + "&";
  }
  if(minPrice.value != "0"){
    attributeString += "priceMin=" + (minPrice.value / 10) + "&";
  }
  if(maxPrice.value != "10"){
    attributeString += "priceMax=" + (maxPrice.value / 10) + "&";
  }
  if(minParticipants.value != "0"){
    attributeString += "partMin=" + minParticipants.value + "&";
  }
  if(maxParticipants.value != "5"){
    attributeString += "partMax=" + maxParticipants.value + "&";
  }
  attributeString = attributeString.substring(0, attributeString.length - 1);

  const label = document.querySelector("#activityLabel");
  const image = document.querySelector("img");
  const link = document.querySelector("#linkForDetails");

  fetch(`${window.apiUrl}api/activity/filter${attributeString}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.activity == undefined){
      label.innerText = "Sorry, there is not yet activity with such filters!"
      image.src = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
      link.href = "/";
    }
    else{
      label.innerText = data.activity;
      image.src = data.imageUrl;
      link.href = "/#/activity/" + data.id;
    }
  }
  );
  event.preventDefault();
}