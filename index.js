const dialog = document.querySelector('dialog#confirm-dialog');
const backFrame = document.querySelector('span#black-frame');
const form = document.querySelector('#recommendations form.recommendation-form');
const recommendationsGrid = document.querySelector('#recommendations > .recommendation-grid');
const toastAnchor = document.querySelector("#toast-anchor")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    if (!formIsValid()) {
        return
    }
    showDialog()
})

/**
 * Show dialog confirm
 * @return {void}
 */
function showDialog() {
    dialog.showModal()
    dialog.classList.add('fade-in');
    backFrame.classList.remove("hidden")
    backFrame.classList.add("fade-in")
}

/**
 * hide dialog confirm
 * @return {void}
 */
function closeDialog() {
    dialog.close()
    dialog.classList.remove('fade-in');
    backFrame.classList.add("hidden")
    backFrame.classList.remove("fade-in")
}

/**
 * Using to defined action of confirm dialog
 * Call when button 'OK' of confirm dialog is click
 * @return {void}
 */
function onConfirm() {
    closeDialog()
    addNewRecommendationElement()
    showToastMessage(`Thanks for your recommendations ❤️`)
}

/**
 * Check form is valid or not
 * @return {boolean}
 * `true` - form is valid <br>
 * `false` - form is invalid
 */
function formIsValid() {
    return Array.from(form.elements).every((el) => el.validity.valid)
}

/**
 * Add new element recommendation to the recommendation list when user submits
 * @return {void}
 */
function addNewRecommendationElement() {
    const {name, recommendation} = form

    const newElement = `
    <div class="recommendation-card">
      <p class="recommendation-text"> <span>"</span> ${recommendation.value} <span>"</span>  </p>
        <div class="recommendation-name">
             ${!!name ? `
                    -- <strong> ${name.value} </strong>
             ` : `---`}
        </div>
    </div>
    `

    recommendationsGrid.insertAdjacentHTML("beforeend", newElement)
}

/**
 * Using to show the toast message
 * @param {string} message the message you want to send
 * @return void
 */
function showToastMessage(message) {
    let toastTimeId;

    const toastElement = document.createElement('li')

    const removeToastMessage = () => {
        toastElement.classList.add('slide-out')
        setTimeout(() => {
            toastElement.remove()
        }, 150)
    }

    toastElement.classList.add('toast-message')
    toastElement.classList.add('slide-in')
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    const button = document.createElement('button')
    button.innerHTML = ' <i class="fi fi-rr-cross"></i>'
    button.classList.add('transparent')
    button.onclick = () => {
        clearTimeout(toastTimeId)
        removeToastMessage()
    }
    toastElement.append(messageElement)
    toastElement.append(button)

    toastTimeId = setTimeout(() => removeToastMessage(), 3000)

    toastAnchor.append(toastElement)
}


