let btnAdd = document.querySelector('#addItem')
let taskName = document.querySelector('#newTask')
let btnAZ = document.querySelector('#two')
let btnZA = document.querySelector('#three')


let tasks =getLocalStorage()
renderTask(tasks)

btnAdd.addEventListener('click', function(){
    if(!taskName.value){
        alert('vui lòng điền nội dung công việc!')
        return false;
    }

    let tasks =getLocalStorage()
    tasks.push({
        name: taskName.value,
        isFisnih:false 
    })
    // console.log(tasks)
    taskName.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks))


    renderTask(tasks)
})

btnAZ.addEventListener('click', function(){
    getLocalStorage()
    tasks.sort(function(a,b){
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
        } 
        if(a.name.toLowerCase() > b.name.toLowerCase()){
            return 1;
        }
        return 0;
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTask(tasks)
})
btnZA.addEventListener('click', function(){
    getLocalStorage()
    tasks.sort(function(a,b){
        if(a.name.toLowerCase() > b.name.toLowerCase()){
            return -1;
        } 
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return 1;
        }
        return 0;
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTask(tasks)
})




function deleteTask(id){
    if(confirm('bạn có thực sự muốn xóa?')){
        let tasks = getLocalStorage()
        tasks.splice(id,1)


        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTask(getLocalStorage())
        // alert('Có')
        // getLocalStorage()
    }


}

function updateStatus(id, update){
    
    getLocalStorage()
    var update = getLocalStorage()
    // document.querySelector('#completed').innerHTML = renderTask(update[id])
    console.log("update[id]: ", update[id]);
    update[id].isFisnih = true
    localStorage.setItem('tasks',[...update , update[id]])
    // let html = '';
    // update.splice(id,1)
    // if(update[id]){
    //     html += 
    //     `<li>
    //         <SPAN>${update[id].name}</SPAN>
    //         <div class= 'buttons'>
    //          <button onclick= 'deleteTask(${id})' > 
    //             <i class="fa fa-trash remove" aria-hidden="true"></i>
    //         </button>
    //         <button onclick= 'updateStatus(${id})' class='complete' > 
    //         <i class="fa fa-check-circle-o fas" aria-hidden="true"></i>
    //         </button>
           
    //         </div>
    //     </li>
    //     `
    // }
   
    
 localStorage.setItem('tasks', JSON.stringify(update))
 localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
    // console.log(update[id])
    renderTask(getLocalStorage())
}





function renderTask(tasks= []){
    let html = '',htmlDone='';
    tasks.forEach(( tasks,index)=> {
        if (tasks.isFisnih ===false) {
            html += 
            `<li>
                ${tasks.name}
                <div class= 'buttons'>
                 <button onclick= 'deleteTask(${index})' > 
                    <i class="fa fa-trash remove" aria-hidden="true"></i>
                </button>
                <button  onclick= 'updateStatus(${index})' class='complete' > 
                <i class="fa fa-check-circle-o complete" aria-hidden="true"></i>
                </button>
               
                </div>
            </li>
            `
        }
        if (tasks.isFisnih ===true) {
            htmlDone += 
            `<li>
                <span>${tasks.name}</span>
                <div class= 'buttons'>
                 <button onclick= 'deleteTask(${index})' > 
                    <i class="fa fa-trash remove" aria-hidden="true"></i>
                </button>
                <button  onclick= 'updateStatus(${index})' class= 'complete' > 
                <i class="fa fa-check-circle-o fas" aria-hidden="true"></i>
                </button>
               
                </div>
            </li>
            `
        }
            
    })
    document.querySelector('#completed').innerHTML = htmlDone;
    document.querySelector('#todo').innerHTML = html;

}

function getLocalStorage (){
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []

}