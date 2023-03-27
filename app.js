const inputEl = document.getElementById('input-el')
const enterEl = document.getElementById('enter-btn')
const ulEl = document.getElementById('ul-el')
const delElAll = document.getElementById('deleteAll-btn')
const localList = JSON.parse(localStorage.getItem('myArr'))
const saveBtn = document.getElementById('save-btn')

let myArr = []

if (localList) {
    myArr = localList
    render()
}

saveBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myArr.push(tabs[0].url)
        localStorage.setItem('myArr', JSON.stringify(myArr))
        render()
    })
})

function render() {
    let listEl = ""
    for (let i = 0; i < myArr.length; i++) {
        listEl += `
            <li>
                <a target='_blank' href='${myArr[i]}'>
                    ${myArr[i]}
                </a><br><br>
            </li>
        `
    }
    ulEl.innerHTML = listEl
}

document.addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        if (inputEl.value === "" || inputEl.value === null) {
            alert('Please filled out this Field')
            inputEl.style.borderColor = 'rgb(31, 87, 104)'
            inputEl.innerHTML = null
         } else {
             inputEl.style.borderColor = ''
             myArr.push(inputEl.value)
             inputEl.value = ""
             localStorage.setItem('myArr', JSON.stringify(myArr))
             render()
         }
    }
})

enterEl.addEventListener('click', function(){
    if (inputEl.value === "" || inputEl.value === null) {
       alert('Please filled out this Field')
       inputEl.style.borderColor = 'rgb(31, 87, 104)'
       inputEl.innerHTML = null
    } else {
        inputEl.style.borderColor = ''
        myArr.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem('myArr', JSON.stringify(myArr))
        render()
    }
})

delElAll.addEventListener('click', function(){
    localStorage.clear()
    myArr = []
    render()
})