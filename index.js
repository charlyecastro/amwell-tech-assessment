// Made a CORS proxy following https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors

// My CORS Proxy
const customProxy = "https://damp-gorge-84454.herokuapp.com/"

// Text URL
const url = "https://www.iwillfearnoevil.com/screen/string.txt"
 
// store Text data response form url fetch
let fetchedData = "";

// Get reference for each HTML elements
let btn = document.getElementById("min3-btn")
let textData = document.getElementById("text-data")
let min1Text = document.getElementById("min1")
let min2Text = document.getElementById("min2")
let min3Text = document.getElementById("min3")

// Takes in a url and fetches data from it to update state of fetchedData variable. Also set the text content for the textData variable
const fetchTextData = (url) =>  {
fetch(url)
    .then(response => {
        return (response.text())
    })
    .then(data => {
        fetchedData = data
        textData.textContent = data
    })
    .catch(error => console.error(error));
}

// Takes in Text and returns an array of the 3 smallest Integers with no duplicates
const minThree = (text) => {
    let min1 = Number.MAX_SAFE_INTEGER
    let min2 = Number.MAX_SAFE_INTEGER
    let min3 = Number.MAX_SAFE_INTEGER

    let textArray = text.split('\n')

    textArray.forEach(val => {
        let num = parseInt(val)
        if (Number.isInteger(num)) {
            if (num < min1) {
                min3 = min2
                min2 = min1
                min1 = num
            } else if (num < min2 && num !== min1) {
                min3 = min2
                min2 = num
            } else if (num < min3 && num !== min2) {
                min3 = num
            }
        }
    });
    return [min1, min2, min3]
}


// Fetches text data from url
fetchTextData(customProxy + url)

// Calls minThree function and uses return value to set textcontent for the 3 result elements
btn.addEventListener("click", () => {
    let min3Array = minThree(fetchedData)
    min1Text.textContent = min3Array[0]
    min2Text.textContent = min3Array[1]
    min3Text.textContent = min3Array[2]
})

