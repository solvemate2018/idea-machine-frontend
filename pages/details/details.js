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
    const table = document.createElement("table");
    const table2 = document.createElement("table");
    const names = ["Type","Number of participants","Accessability","Usual duration"
    ,"Availability (1-10)","Price (1-10)"];
    const values = [activity.type,activity.participants,activity.accessibility
      ,activity.duration,activity.availability * 10, activity.price * 10]

    const title = document.createElement("h2");
    title.innerText = activity.activity;
    htmlActivity.appendChild(title);
    htmlActivity.appendChild(document.createElement("br"));

    for(let i = 0; i<names.length; i++){
      const row = table.insertRow();
      const cell0 = row.insertCell();
      const cell1 = row.insertCell();
      const text0 = document.createTextNode(names[i]);
      const text1 = document.createTextNode(values[i]);
      cell0.appendChild(text0);
      cell1.appendChild(text1);
    }
    
    if(activity.kidFriendly){
        const row = table2.insertRow();
        const cell = row.insertCell();
        const text = document.createTextNode("Kid friendly!")
        cell.appendChild(text)
    }

    if(activity.link != undefined){
    const link = document.createElement("a");
    link.href = activity.link;
    link.innerText = "More info here...";
    const row = table2.insertRow();
    const cell = row.insertCell();
    cell.appendChild(link);
  }
  htmlActivity.appendChild(table);
  htmlActivity.appendChild(table2);
}