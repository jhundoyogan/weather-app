//client side javascript
const weatherForm = document.querySelector('form') //form from the index.hbs
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')//uses the pound sign # since we're selecting an id
const messageTwo = document.querySelector('#message-2')

// 'e' is an event object
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //the preventDefault method prevents the page from refreshing, instead it allows us
    //to run the function

    const location = search.value //from the value of the input

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    //Fetch API, uses 'then' method on the return value(response) from the fetch function and after that the
    //callback function we wanna run
    //fetch either on local host or in the heroku app url
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})