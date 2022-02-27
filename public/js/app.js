console.log('client side javascript file loaded')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                return console.log(data.error)
            }
            console.log(data)
            messageOne.textContent = 'location : ' + data.location
            messageTwo.textContent = 'Temperature : ' + data.forecastData.temperature + '   Humidity : '  + data.forecastData.humidity
        })
    })    
})