const inputvalue = document.querySelector(".inputField input");
const addbutton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deletebutton = document.querySelector(".footer button");

inputvalue.onkeyup = ()=>{
  let userinput = inputvalue.value; 
  if(userinput.trim() != 0){ 
    addbutton.classList.add("active"); 
  }else{
    addbutton.classList.remove("active");
  }
}
outputtask();
addbutton.onclick = ()=>{
  let userinput = inputvalue.value; 
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    datalist = []; 
  }else{
    datalist = JSON.parse(getLocalStorageData); 
  }
  datalist.push(userinput);
  localStorage.setItem("New Todo", JSON.stringify(datalist)); 
  outputtask(); 
  addbutton.classList.remove("active");
}
function outputtask(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    datalist = [];
  }else{
    datalist = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.teinputvaluetContent = datalist.length; 
  if(datalist.length > 0){ 
    deletebutton.classList.add("active"); 
  }else{
    deletebutton.classList.remove("active");
  }
  let newLiTag = "";
  datalist.forEach((element, x) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deletedata(${x})">Delete</span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputvalue.value = ""; 
}

function deletedata(x){
  let getLocalStorageData = localStorage.getItem("New Todo");
  datalist = JSON.parse(getLocalStorageData);
  datalist.splice(x, 1); 
  localStorage.setItem("New Todo", JSON.stringify(datalist));
  outputtask();
}
deletebutton.onclick = ()=>{
  datalist = [];
  localStorage.setItem("New Todo", JSON.stringify(datalist)); 
  outputtask(); }