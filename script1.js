const readItemDetails = () =>{
  console.log('readItemDetails');
  let paramsData = window.location.search.split('=')[1];
  console.log(paramsData);
  document.getElementById('pagename').innerHTML=paramsData;
  const storage = JSON.parse(localStorage.getItem("teamList"));
//   console.log(storage);
  if(storage.length){
    for (let items of storage) {
        if(items.name==paramsData){

          document.getElementById('winCnt').innerHTML=items.wonCount
        }
        // console.log(items);
    }
  }  
}


const form = document.querySelector("form");
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const array = [];
let rowIndex;


const tableHead = data => {
  let ObjectKeys;
  for (let items of data) {
    ObjectKeys = Object.keys(items);
  }
  let row = document.createElement("tr");
  for (let key of ObjectKeys) {
    let heading = document.createElement("th");
    heading.innerText = key.toUpperCase();
    row.appendChild(heading);
  }
  let headingbtn = document.createElement("th");
  headingbtn.innerText = "ACTION";
  row.appendChild(headingbtn);
  thead.appendChild(row);
  table.appendChild(thead);
};

const tableBody = data => {
  for (let items of data) {
    let ObjectKeys = Object.values(items);
    let row = document.createElement("tr");
    for (let values of ObjectKeys) {
      let cell = document.createElement("td");
      cell.innerText = values;
      row.appendChild(cell);
    }
    let cellbtn = document.createElement("td");
    var btn1 = document. createElement('input');
    btn1. type = "button";
    btn1. className = "deletebtn";
    btn1. value = "Delete";
    btn1. onclick = function deleteclick(){
      data.forEach((d,index)=>{
        if(d==items)
        data.splice(index, 1);
      })
      window.confirm("Are you intrested to delete the player profile")
      let paramsData = window.location.search.split('=')[1];
      localStorage.removeItem(paramsData);
      console.log(data);
      localStorage.setItem(paramsData,JSON.stringify(data));
      window.location.reload();
    };
    cellbtn.appendChild(btn1);
    row.appendChild(cellbtn);
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  console.log(table);
};

const createItem = () => {
  const playerName = document.querySelector("#playerName").value;
  const from = document.querySelector("#from").value;
  const price = document.querySelector("#price").value;
  const isPlaying = document.querySelector("#isPlaying").value;
  const description = document.querySelector("#description").value;
  if (playerName === "") {
    alert(" playerName can not be left empty");
    document.querySelector("#playerName").focus();
    return;
  }
  if (from === "") {
    alert(" from can not be left empty");
    document.querySelector("#from").focus();
    return;
  }
  if (price === "") {
    alert(" price can not be left empty");
    document.querySelector("#price").focus();
    return;
  }
  if (isPlaying === "") {
    alert(" isPlaying can not be left empty");
    document.querySelector("#isPlaying").focus();
    return;
  }
  if (description === "") {
    alert(" description can not be left empty");
    document.querySelector("#description").focus();
    return;
  }
  

  const formData = {
    playerName,
    from,
    price,
    isPlaying,
    description,
  };
  console.log(formData);
  array.push(formData);

  try {
    let paramsData = window.location.search.split('=')[1];
    if (localStorage.getItem(paramsData) === null) {
      localStorage.setItem(paramsData, JSON.stringify(array));
    } else {
      let storage = JSON.parse(localStorage.getItem(paramsData));
      storage.push(formData);
      localStorage.setItem(paramsData, JSON.stringify(storage));
      console.log(storage);
    }
  } catch (err) {
    console.error(err);
  }
  alert("you have successfully saves the player");
  form.reset();
  readItem();
  setTimeout(() => {
    window.location.reload();
  }, 100);
};


const readItem = () => {
  let paramsData = window.location.search.split('=')[1];
  const storage = JSON.parse(localStorage.getItem(paramsData));
  if (storage && storage.length >= 1) {
    if (table.rows.length < 1) {
      tableHead(storage);
      tableBody(storage);
    }
  } else {
    return;
  }
};




window.onload =readItemDetails(),readItem();



// add popup form

document.querySelector("#add").addEventListener("click",function(){
  document.querySelector(".popupform").classList.add("active");
});
// this code is for cencel 
document.querySelector(".close-btn")
.addEventListener("click",function(){
  document.querySelector(".popupform").classList.remove("active");
});