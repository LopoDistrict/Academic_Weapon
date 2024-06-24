const baseStorage = {
    "itemsTask": [
        {

        }
    ]
};
//localStorage.clear();

if (!localStorage.getItem("tasks")) {
    
    localStorage.setItem("tasks", JSON.stringify(baseStorage));
}

function ranId(){
    var nb = "";
    for (let i=0; i <8;i++){
        nb += Math.floor(Math.random() * (9 - 0 + 1)) + 0
    }return nb;
}


document.addEventListener('DOMContentLoaded', function() {
    const storedTasks = localStorage.getItem("tasks");
    console.log(storedTasks)
    
    if (storedTasks) {
        // Step 2: Parse the stored JSON string back into an object
        const tasks = JSON.parse(storedTasks);
        console.log(tasks)
        // Assuming tasks.itemsTask is an array of tasks
        
            // Step 3: Loop through each task and display it
            tasks.itemsTask.forEach(task => {

                displayTask(task); 
            });
        
    }
    // If there's no data, do nothing
});

function displayTask(task) {
    for (const key in task) {
        const taskDetails = task[key];


        if (Array.isArray(taskDetails) && taskDetails.length === 6) { //si on ajoute de nv element changer le nb
            const [name, description, color, datetxt, prio, id] = taskDetails;            
            console.log('rewritting tasks')
            const nvtask2 = document.createElement("div");
            nvtask2.style.backgroundColor = color;

            var nv_desk2 = description

            if (description.length >= 24){
                nv_desk2 = description.slice(0, 24)
            }

            const text = `<label class="contain">
                <input type="checkbox">
                <svg viewBox="0 0 64 64" height="2em" width="2em" onclick="done(this)">
                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                </svg>
                </label>
                <p id="title_task">${name}</p>
                <p id="desc_task">${nv_desk2}...</p>
                <p>${datetxt}</p>
                <img src="../img/icon/bin.png" id="bin" onclick="delete_task(this)" style='margin-right: 50px;'>
                <img src="../img/icon/rewrite.png" id="bin" onclick="edit(this)" style='height: 40px'>
            `;
            if (prio == true){
                nvtask2.style.border = "3px solid rgb(189, 7, 7)";
                console.log("is checked");
            }
            nvtask2.setAttribute("IdStorage", id);

            nvtask2.className = "task_add";
            nvtask2.id = "task_add";

            const container = document.getElementById("container");
            container.appendChild(nvtask2);

            nvtask2.insertAdjacentHTML("afterbegin", text);
        }
    }
}








function done(checkbox) {
const task = checkbox.closest('.task_add'); // Find the closest task div to this checkbox
const style = task.style;

if (style.filter === "brightness(0.5)") {
style.filter = "brightness(1)";
} else {
style.filter = "brightness(0.5)";
}
}

    function hideTask(){
        document.getElementById("warning").style.display ="none";   
    }



    function delete_task(img) {
        const task = img.closest('.task_add');
        const taskId = task.getAttribute('IdStorage'); 
    
        const tasksData = JSON.parse(localStorage.getItem("tasks"));
    
        if (tasksData && tasksData.itemsTask) {
            const index = tasksData.itemsTask.findIndex(item => Object.keys(item)[0] === taskId);
            if (index !== -1) {
                tasksData.itemsTask.splice(index, 1);                
                localStorage.setItem("tasks", JSON.stringify(tasksData));                        
                task.remove();
            }
        }
    }


    function warning(){
        document.getElementById("warning").style.display ="block";                
    }

    document.addEventListener('click', function(event) {
    var isClickInside = document.getElementById('warning').contains(event.target);

    if (!isClickInside) {            
        hideTask();
    }
    });

    

    
    function add(name, Description, color){    
        name = document.getElementById("titlet").value;            
        Description = document.getElementById("desct").value;
        //localStorage.setItem("TODO", JSON.stringify(LIST));
        const nvtask = document.createElement("div");

        const color_input = document.getElementById("color"); // on change la task de couleur
        nvtask.style.backgroundColor = color_input.value;

        const title_text = document.createTextNode(name);
        const desc_text = document.createTextNode(Description);

        if (name.length === 0){
            console.log("empty tittle")
            warning();                    
        }

        //title.appendChild(title_text);
        //desc.appendChild(desc_text);
        
        //check if description is 2 long
        //if (desc.length >= 20){
        //    desc.length = 17
        //    desc += "..."
        //}


        //title.id = "title_task"
        //desc.id = "desc_task"
        nvtask.id = "task_add";
        //nvtask.appendChild(title);
        //nvtask.appendChild(desc);



        const cal = document.getElementById("start"); //"2024-03-22"

        const d = new Date(cal.value)
        //const calendar = document.createElement("p");
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const caltxt = d.getDate()+ "·" + months[d.getMonth()];
        //calendar.appendChild(caltxt);
        caltxt.id = "calendar";

        //nvtask.appendChild(calendar);  
        console.log("caltxt", caltxt)    
        var nv_desk = Description

        if (Description.length >= 24){
            nv_desk = Description.slice(0, 24)
        }
    const text = `<label class="contain">
            <input type="checkbox" id='prioCheck'>
            <svg viewBox="0 0 64 64" height="2em" width="2em" onclick="done(this)">
                <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
            </svg>
            </label>
            <p id="title_task">${name}</p>
            <p id="cal">${caltxt}</p>
            <p id="desc_task">${nv_desk}</p>
            <img src="../img/icon/bin.png" id="bin" onclick="delete_task(this)" style='margin-right: 50px;'>
            <img src="../img/icon/rewrite.png" id="bin" onclick="edit(this)" style='height: 40px'>
        `;
    


        const prio = document.getElementById("prioritize");
        if (prio.checked == true){
            nvtask.style.border = "3px solid rgb(189, 7, 7)";
            console.log("is checked");
        }
        nvtask.className = "task_add";
        const randomId = ranId() 

      
        const container = document.getElementById("container");
        nvtask.setAttribute("IdStorage", randomId.toString());
        container.appendChild(nvtask);

        
        
        
        
        const newItem = {
            [randomId]: [name, Description, color_input.value, caltxt, prio.checked,randomId],
        };
    
        const data = localStorage.getItem("tasks");
        const jsonData2 = JSON.parse(data) || { "itemsTask": [] }; // Fallback in case there's no data
    
        // Find and update the existing item in jsonData2.itemsTask
        const index = jsonData2.itemsTask.findIndex(item => Object.keys(item)[0] === randomId.toString());
        if (index !== -1) {
            // Update the existing item
            jsonData2.itemsTask[index] = newItem;
        } else {
            // If the item doesn't exist, add it
            jsonData2.itemsTask.push(newItem);
        }
    
        localStorage.setItem("tasks", JSON.stringify(jsonData2));

        console.log(JSON.parse(localStorage.getItem("tasks")));


        nvtask.insertAdjacentHTML("afterbegin", text);        
        hide();
        undeployed();
        prio.checked = false;
        color_input.value = "#083550";
    }


    
    function edit(close){
        console.log(close)
        const task = close.closest('.task_add');
        const title = close.closest('#title_task');
        const desc = close.closest('#desc_task');
        const prio = close.closest('#prioCheck');
        const color = task.style.backgroundColor;
        const date = close.closest('#cal');
        

        console.log("title) "+ title);
        console.log("desc); "+ desc);
        console.log("prio2) "+ prio);
        console.log("color) "+ color);
        console.log("date); "+ date);
                
        document.getElementById("task").style.display = "block";
        document.body.style.backgroundColor = "#070707";
        document.getElementById("taskmain").style.filter = " brightness(50%)";

        if (prio.checked){
            document.getElementById('prioritize').checked = true;
        }
        document.getElementById('start').value = date;
        document.getElementById('color').value = color;

        
        delete_task(close);
    }

    function task(){
        document.getElementById("task").style.display = "block";
        document.body.style.backgroundColor = "#070707";
        document.getElementById("taskmain").style.filter = " brightness(50%)";
        document.getElementById("titlet").value = "";
        document.getElementById("desct").value = "";
    }
    function hide(){
        $(document).ready(function(){
            $("#task").fadeOut();
  
          });
        document.getElementById("task").style.display = "none";

        document.getElementById("taskmain").style.filter = " brightness(100%)";
        document.body.style.backgroundColor  = "#121212";
    }

    
    

    function undeployed(){
        const task =  document.getElementById("task");
        task.style.height = "300px";
        document.getElementById("option").style.display = "block";
        document.getElementById("create").style.marginTop = "0px";
        const options = document.getElementById("options");
        options.style.display = "none";
    }

    function deploy(){
        const task =  document.getElementById("task");
        task.style.height = "400px";
        document.getElementById("option").style.display = "none";
        document.getElementById("create").style.marginTop = "10px";
        const options = document.getElementById("options");
        options.style.display = "block";

    }
