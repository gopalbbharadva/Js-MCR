const employeeListContainer = document.querySelector('.employee-list-container')
const employeeListInfo = document.querySelector('.employee-info-container')
let employeeData = []

;(async () => {
  let selectedEmployeeId
  let selectedEmployee
  try {
    const res = await fetch('./data/data.json')
    const data = await res.json()
    employeeData = data
    selectedEmployee = employeeData[0]
    selectedEmployeeId = employeeData[0].id
  } catch (error) {
    console.log('error', error)
  }

  const selectEmployee = (e) => {
    if (selectedEmployeeId !== e.target.id && e.target.tagName === 'DIV') {
      selectedEmployeeId = e.target.id
      renderEmployees()
      renderSingleItem()
    }
  }

  employeeListContainer.addEventListener('click', selectEmployee)

  const renderEmployees = () => {
    employeeListContainer.innerHTML = ''
    employeeData.forEach((element) => {
      const employeeItem = document.createElement('div')

      employeeItem.setAttribute('id', element.id)
      employeeItem.classList.add('employee-item')
      employeeItem.innerHTML = `
    ${element.firstName}
    <i class='remove-icon'>X</i><br/>
    `
      if (element.id === parseInt(selectedEmployeeId, 10)) {
        employeeItem.classList.add('selected-employee')
        selectedEmployee = element
      }

      employeeListContainer.appendChild(employeeItem)
    })
  }

  const renderSingleItem = () => {
    employeeListInfo.innerHTML = ''
    employeeListInfo.innerHTML = `
    <img src='${selectedEmployee.imageUrl}' class='image-avatar'/>
    <p>${selectedEmployee.firstName}</p><br/>
    <p>${selectedEmployee.lastName}</p><br/>
    <p>${selectedEmployee.contactNumber}</p><br/>
    `
  }
  renderEmployees()
  renderSingleItem()
})()

// First we will render all employee details in left bar.
