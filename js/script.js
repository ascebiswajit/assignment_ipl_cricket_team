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
    var btn = document. createElement('input');
    var btn1 = document. createElement('input');
    btn. type = "button";
    btn1. type = "button";
    btn. className = "viewbtn";
    btn1. className = "deletebtn";
    btn. value = "View";
    btn1. value = "Delete";
    btn. onclick = function viewclick(){
      // console.log('viewclick',items);
      window.open('player.html?team='+items.name);
    };
    btn1. onclick = function deleteclick(){
      console.log('delete');
      // console.log(data);
      // console.log(items);
      data.forEach((d,index)=>{
        if(d==items)
        data.splice(index, 1);
      })
      localStorage.removeItem('teamList');
      console.log(data);
      localStorage.setItem('teamList',JSON.stringify(data));
      window.location.reload();
    };
    cellbtn.appendChild(btn);
    cellbtn.appendChild(btn1);
    row.appendChild(cellbtn);
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  console.log(table);
};

const createItem = () => {
  const name = document.querySelector("#name").value;
  const icon = document.querySelector("#icon").value;
  const playerCount = document.querySelector("#playerCount").value;
  const topBowler = document.querySelector("#topBowler").value;
  const topBatsman = document.querySelector("#topBatsman").value;
  const wonCount = document.querySelector("#wonCount").value;
  if (name === "") {
    alert(" name can not be left empty");
    document.querySelector("#name").focus();
    return;
  }
  if (playerCount === "") {
    alert(" playerCount can not be left empty");
    document.querySelector("#playerCount").focus();
    return;
  }
  if (topBowler === "") {
    alert(" topBowler can not be left empty");
    document.querySelector("#topBowler").focus();
    return;
  }
  if (topBatsman === "") {
    alert(" topBatsman can not be left empty");
    document.querySelector("#topBatsman").focus();
    return;
  }
  if (wonCount === "") {
    alert(" wonCount can not be left empty");
    document.querySelector("#wonCount").focus();
    return;
  }

  const formData = {
    name,
    icon,
    playerCount,
    topBowler,
    topBatsman,
    wonCount,
  };
  console.log(formData);
  array.push(formData);

  try {
    if (localStorage.getItem("teamList") === null) {
      localStorage.setItem("teamList", JSON.stringify(array));
    } else {
      let storage = JSON.parse(localStorage.getItem("teamList"));
      storage.push(formData);
      localStorage.setItem("teamList", JSON.stringify(storage));
      console.log(storage);
    }
  } catch (err) {
    console.error(err);
  }
  alert("you have successfully saves the team");
  form.reset();
  readItem();
  setTimeout(() => {
    window.location.reload();
  }, 100);
};

const readItem = () => {
  const storage = JSON.parse(localStorage.getItem("teamList"));
  if (storage && storage.length >= 1) {
    if (table.rows.length < 1) {
      tableHead(storage);
      tableBody(storage);
    }
  } else {
    return;
  }
};

function resetData(){
  localStorage.clear();
  window.location.reload();
}



window.onload =readItem();

// add popup form

document.querySelector("#add").addEventListener("click",function(){
  document.querySelector(".popup").classList.add("active");
});
// this code is for cencel 
document.querySelector(".close-btn")
.addEventListener("click",function(){
  document.querySelector(".popup").classList.remove("active");
});

//  page sliding
    function imgSlider(anything){
        document.querySelector('.logo').src=anything;
    }
    function changeBgColor(color){
        const sec = document.querySelector(".sec");
        sec.style.background = color;  
          }



          // search something
  //  search_input = self.requestAnimationFrame.get.get('search-area') or ''
  //  if search_input:
  //     context['task'] = context['task'].filter(title_icontains=search_input)