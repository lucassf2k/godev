let tasks = []
let readTasks = []

window.onload = () => {
  const tasksJSON = JSON.parse(localStorage.getItem("@TODO"))
  const readJSON = JSON.parse(localStorage.getItem('@TODOREAD'))

  if (!tasksJSON) return 

  for (let task of tasksJSON) {
    tasks.push(task)
  }

  if (readJSON) {
    for(let readed of readJSON) {
      readTasks.push(readed)
    }
  }

  if (!tasks) return 

  tasks.forEach((task, index) => {

    tasksHTML.innerHTML += TasksComponent(task, index)

    readTasks.forEach(readed => {
      if (Number(document.getElementById(index).id) === Number(readed)) {
        document.getElementById(index).classList.add('checked')
      }
    })
  })
}

const tasksHTML = document.querySelector('.tasks')
const inputHTML = document.getElementsByTagName("input")[0]

addEventListener('click', (event) => {
  
  if (event.target.className === 'deleteTask') {
    const indexOfRemove = event.target.id
    tasks.splice(Number(indexOfRemove), 1)

    let readDifferenceOne = []
    if (event.composedPath()[1].classList.contains('checked')) {
      readTasks.forEach(item => {
        if (!(Number(item) === Number(indexOfRemove))) {
          readDifferenceOne.push((item - 1))
        }
      })
    } else {
    
      readTasks.forEach((item) => { 
        if (Number(item) < Number(event.composedPath()[1].id)) {
          readDifferenceOne.push(item)
        } else {
          readDifferenceOne.push((item - 1))
        }
      })
    }
    
    if (!tasks) return

    tasksHTML.innerHTML = ''

    tasks.forEach((task, index) => {
      tasksHTML.innerHTML += TasksComponent(task, index)
      

      readDifferenceOne.forEach(readed => {
        if (Number(document.getElementById(index).id) === Number(readed)) {
          document.getElementById(index).classList.add('checked')
        }
      })
    })

    localStorage.setItem('@TODO', JSON.stringify(tasks))
    localStorage.setItem('@TODOREAD', JSON.stringify(readDifferenceOne))

    readTasks = readDifferenceOne
  } else if (event.target.className === 'checkedTask') {
    if (Number(event.composedPath()[1].id) === Number(event.target.id)) {
      event.composedPath()[1].classList.add('checked')
      readTasks.push(event.target.id)
      localStorage.setItem('@TODOREAD', JSON.stringify(readTasks))
    }
  }
})


let count
addEventListener('keypress', (event) => {
  
  tasks.length === 0 ? count = 0 : count = tasks.length

  if (event.key === 'Enter') {
    if (inputHTML.value.length !== 0) {
      tasksHTML.innerHTML += TasksComponent(inputHTML.value, count)
      tasks.push(inputHTML.value)
      inputHTML.value = ''
      localStorage.setItem("@TODO", JSON.stringify(tasks))
    }
  }
  count = 0
})

function TasksComponent(task, index) {
  return (
  `
  <p class="chores" id="${index}">
    <img src="/assets/icons/check-square.svg" class="checkedTask" id="${index}">
    <span>${task}</span>
    <img src="/assets/icons/trash.svg" class="deleteTask" id="${index}">
  </p>
  `)
}