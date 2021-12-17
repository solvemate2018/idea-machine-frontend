export default (activityID) => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/details/details.html")
      .then((response) => response.text())
      .then((mainHtml) => {
        content.innerHTML = mainHtml;
        generateDynamicContent(activityID);
      });
  };

  async function generateDynamicContent(activityID){
    const activity = await fetchActivity(activityID);
  }
  
  function fetchActivity(activityID){
    fetch(`${window.apiUrl}api/activity/${activityID}`)
    .then(response => response.json())
    .then(data => {
        generateActivityFields(data);
    });
  }

  function generateActivityFields(activity){
    const htmlActivity = document.querySelector(".activity");


    const title = document.createElement("h2");
    title.innerText = activity.activity;
    htmlActivity.appendChild(title);

    htmlActivity.appendChild(document.createElement("br"));

    const type = document.createElement("p");
    type.innerText = "Type: " + activity.type;
    htmlActivity.appendChild(type);

    const participants = document.createElement("p");
    participants.innerText = "Number of participants: " + activity.participants;
    htmlActivity.appendChild(participants);

    const accessibility = document.createElement("p");
    accessibility.innerText = "Accessability: " + activity.accessibility;
    htmlActivity.appendChild(accessibility);

    const duration = document.createElement("p");
    duration.innerText = "Usual duration: " + activity.duration;
    htmlActivity.appendChild(duration);

    if(activity.kidFriendly){
        const kidFriendly = document.createElement("p");
        kidFriendly.innerText = "Kid friendly!";
        htmlActivity.appendChild(kidFriendly);
    }

    const availability = document.createElement("p");
    availability.innerText = "Availability from 1 to 10: " + (activity.availability * 10);
    htmlActivity.appendChild(availability);

    const price = document.createElement("p");
    price.innerText = "Price from 1 to 10: " + (activity.price * 10);
    htmlActivity.appendChild(price);

    if(activity.link != undefined){
    const link = document.createElement("a");
    link.href = activity.link;
    link.innerText = "More info here...";
    htmlActivity.appendChild(link);
  }
}