// Variables //

let button = document.querySelector("#bt") //start button
let start = document.querySelector("#startfield") // input field maximum number
let addN = document.querySelector("#addN") // input field maximum range
let st = document.querySelector("#LS") // text let's start
let turn = document.querySelector("#whoTurn") // text whose turn
let mn = document.querySelector("#mn") // what machine chose
let ht = document.querySelector("#humanTurn") // block for human
let output = document.querySelector("#sumoutput") // sum
let buttonHT = document.querySelector("#btHT") // button for enter human number
let numberHuman = document.querySelector("#numberHuman") // field for enter human number
let continueBT = document.querySelector("#cont") // continue button
let alert1 = document.querySelector('#alert1') // alert if max less then min
let result = document.querySelector('#result') // result message
let wrong = document.querySelector("#wrong") // wrong message
let restart = document.querySelector("#restart") // button result
let gameBlock = document.querySelector("#gameBlock")
let buttonMH = document.querySelector("#BTMH")
let ff = document.querySelector('#ff')
let buttonHH = document.querySelector('#BTHH')
let button1 = document.querySelector('#bt1')
let fieldHH = document.querySelector('#fieldHH')
let buttonHH1 = document.querySelector('#btHH1')
let buttonHH2 = document.querySelector('#btHH2')
let contHH = document.querySelector('#contHH')
let numberHuman1 = document.querySelector('#numberHuman1')
let numberHuman2 = document.querySelector('#numberHuman2')
let btMOD = document.querySelector('#BTMOD')
let button2 = document.querySelector("#bt2")
let btContMod = document.querySelector('#btContMod')
let startBTS = document.querySelector('#startBTS')
let sum1 = 0 // total sum
let players = ['human', 'machine'] // players
let whoFirst = myRandom(0, 1) // who start game
let currPlayer  // random first player
let addMax
let max
let cycleSize
let reminder
let firstNumberToAdd
let compNumber

// Machine & Human //

function startGame() { // function start game
    if (startGameMod === true) {
        button.disabled = true
        button.style.opacity = "0.2"
        restart.style.display = "block"
        continueBT.style.display = "block" // show button continue
        st.style.display = "block" // show text let's start
        gameBlock.style.display = "block"
        addMax = parseFloat(addN.value)
        max = parseFloat(start.value)
        cycleSize = addMax + 1
        reminder = max % cycleSize
        firstNumberToAdd = reminder
        compNumber = reminder
        if (reminder > 0) {
            currPlayer = "machine"
            machineTurn()
        } else {
            currPlayer = "human"
            humanTurn()
        }
    } else {
        let whoFirst = myRandom(0, 1)
        currPlayer = players[whoFirst]
        button.disabled = true
        button.style.opacity = "0.2"
        restart.style.display = "block"
        continueBT.style.display = "block" // show button continue
        st.style.display = "block" // show text let's start
        gameBlock.style.display = "block"
        if (currPlayer === 'human') {  // if human start
            humanTurn() // call human function
            buttonHT.disabled = false
            buttonHT.style.opacity = "1"
            continueBT.disabled = true
            continueBT.style.opacity = "0.2"
        } else {
            machineTurn() // call machine function
        }
    }
}

function humanTurn() { // human function
    turn.innerHTML = "Now human turn" //text now human turn
    ht.style.display = "block" // show enter field for human
}

function machineTurn() { // machine function
    continueBT.disabled = false
    continueBT.style.opacity = "1"
    cycleSize = addMax + 1
    reminder = max % cycleSize
    firstNumberToAdd = reminder
    compNumber = reminder
    turn.innerHTML = "Now machine turn"  // text now machine turn
    if (startGameMod === true) {
        compNumber = cycleSize - ((sum1 - firstNumberToAdd) % cycleSize)
        if (compNumber > cycleSize) {
            compNumber = compNumber - cycleSize
            console.log(compNumber)
        } else if (compNumber === cycleSize) {
            sum1 += 1
            console.log(compNumber)
        }
        mn.innerHTML = "Machine chose number " + compNumber
        sum1 += compNumber
        output.innerHTML = "Total amount: " + sum1
    }
    else {
        compNumber = myRandom(1, addN.value)
        mn.innerHTML = "Machine chose number " + compNumber // machine chose + chose number
        sum1 += compNumber // sum
        output.innerHTML = "Total amount: " + sum1 // text total amount// random number from 1 to max number
    }
}

function myRandom(minN, maxN) { // random function
    return Math.floor(Math.random() * (maxN - minN + 1)) + minN // math expression
}

function addHN() { // button for add human number
    let humanNum = parseFloat(numberHuman.value) // translation to number
    let addNum = parseFloat(addN.value)
    if (humanNum > addNum || humanNum < 1) { // if human number higher max number or less min number
        wrong.innerHTML = "Wrong number, please enter number from 1 to " + addN.value // wrong
        buttonHT.disabled = true// continue work button add human number
        buttonHT.style.opacity = "0.2"
    } else {
        buttonHT.disabled = false // turn on button
        buttonHT.style.opacity = "1"
    }
}

function continueGame() { // function continue
    if (sum1 < start.value && currPlayer === 'human') { // if sum doesn't equal max number and human turn
        currPlayer = 'machine' // switch to machine
        buttonHT.disabled = true // turn off button
        buttonHT.style.opacity = "0.2"
        machineTurn() // call machine function
    } else if (sum1 < start.value && currPlayer === 'machine') { // if sum doesn't equal max number and machine turn
        currPlayer = 'human' // switch to human
        buttonHT.disabled = false // turn on button
        buttonHT.style.opacity = "1"
        continueBT.disabled = true
        continueBT.style.opacity = "0.2"
        humanTurn() // call human function
    } else if (sum1 >= start.value && currPlayer === 'human') { // if sum equal max number and human turn
        result.style.display = "block"
        result.innerHTML = "Congratulations! You won!" // win message
        continueBT.style.opacity = "0.2"
        continueBT.disabled = true
    } else if (sum1 >= start.value && currPlayer === 'machine') { // if sum equal max number and machine turn
        result.style.display = "block"
        result.innerHTML = "Machine won!" // machine win message
        continueBT.style.opacity = "0.2"
        continueBT.disabled = true
    }
}

function alert() { // function alert
    let a = parseFloat(addN.value) // translation to number
    let s = parseFloat(start.value) // translation to number}
    if (a >= s) { // add number higher then max number
        alert1.innerHTML = "Add number have to lower than the win number" // message
        button.style.opacity = "0.2"
        button1.style.opacity = "0.2"
        button2.style.opacity = "0.2"
        button.disabled = true // turn off start button
        button1.disabled = true
        button2.disabled = true
    }
    else if (a < 1) { // if add number less then one
        alert1.innerHTML = "Add number have to higher then zero" // message
        button.style.opacity = "0.2"
        button1.style.opacity = "0.2"
        button2.style.opacity = "0.2"
        button.disabled = true // turn off start button
        button1.disabled = true
        button2.disabled = true
    } else {
        button.style.opacity = "1"
        button1.style.opacity = "1"
        button2.style.opacity = "1"
        button.disabled = false // turn on start button
        button1.disabled = false
        button2.disabled = false
    }
}

function buttonHumNum() { // add human num function
    sum1 += parseFloat(numberHuman.value)
    output.innerHTML = "Total amount: " + sum1 // show total amount
    buttonHT.disabled = true
    buttonHT.style.opacity = "0.2"
    btContMod.disabled = false
    btContMod.style.opacity = "1"
    continueBT.disabled = false
    continueBT.style.opacity = "1"
}

// Human & Human //
let players1 = ['human1', 'human2']
let currPlayerHH = players1[whoFirst]

function startGameHH() { // start game human & human
    button1.disabled = true
    button1.style.opacity = "0.2"
    continueBT.style.display = "none"
    gameBlock.style.display = "block"
    st.style.display = "block" // show text let's start
    fieldHH.style.display = "block"
    restart.style.display = "block"
    if (currPlayerHH === 'human1') {  // if human start
        human1Turn() // call human function
        buttonHH2.disabled = true
        buttonHH2.style.opacity = "0.2"
        buttonHH1.disabled = false
        buttonHH1.style.opacity = "1"
        contHH.disable = true
        contHH.style.opacity = "0.2"
    } else {
        human2Turn() // call machine function
        buttonHH1.disabled = true
        buttonHH1.style.opacity = "0.2"
        buttonHH2.disabled = false
        buttonHH2.style.opacity = "1"
        contHH.disabled = true
        contHH.style.opacity = "0.2"
    }
}

function human1Turn() {
    turn.innerHTML = "Now human 1 turn"
    contHH.disabled = true
    contHH.style.opacity = "0.2"
}

function human2Turn() {
    turn.innerHTML = "Now human 2 turn"
    contHH.disabled = true
    contHH.style.opacity = "0.2"
}

function continueGameHH() { // function continue
    if (sum1 < start.value && currPlayerHH === 'human1') { // if sum doesn't equal max number and human turn
        currPlayerHH = 'human2' // switch to machine
        buttonHH1.disabled = true // turn off button
        buttonHH1.style.opacity = "0.2"
        buttonHH2.disabled = false
        buttonHH2.style.opacity = "1"
        human2Turn() // call machine function
    } else if (sum1 < start.value && currPlayerHH === 'human2') { // if sum doesn't equal max number and machine turn
        currPlayerHH = 'human1' // switch to human
        buttonHH1.disabled = false // turn on button
        buttonHH1.style.opacity = "1"
        buttonHH2.disabled = true
        buttonHH2.style.opacity = "0.2"
        human1Turn() // call human function
    } else if (sum1 >= start.value && currPlayerHH === 'human1') { // if sum equal max number and human turn
        result.style.display = "block"
        result.innerHTML = "Congratulations! Human 1 won!" // win message
        buttonHH1.disabled = true
        buttonHH1.style.opacity = "0.2"
        buttonHH2.disabled = true
        buttonHH2.style.opacity = "0.2"
        contHH.style.opacity = "0.2"
        contHH.disabled = true
    } else if (sum1 >= start.value && currPlayerHH === 'human2') { // if sum equal max number and machine turn
        result.style.display = "block"
        result.innerHTML = "Congratulations! Human 2 won!" // machine win message
        buttonHH1.disabled = true
        buttonHH1.style.opacity = "0.2"
        buttonHH2.disabled = true
        buttonHH2.style.opacity = "0.2"
        contHH.style.opacity = "0.2"
        contHH.disabled = true
    }
}

function buttonHHNum1() { // add human num function
    sum1 += parseFloat(numberHuman1.value)
    output.innerHTML = "Total amount: " + sum1 // show total amount
    buttonHH1.disabled = true
    buttonHH1.style.opacity = "0.2"
    contHH.disabled = false
    contHH.style.opacity = "1"
}

function buttonHHNum2() { // add human num function
    sum1 += parseFloat(numberHuman2.value)
    output.innerHTML = "Total amount: " + sum1 // show total amount
    buttonHH2.disabled = true
    buttonHH2.style.opacity = "0.2"
    contHH.disabled = false
    contHH.style.opacity = "1"
}

function addH1() { // button for add human number
    let human1 = parseFloat(numberHuman1.value)
    let addNum = parseFloat(addN.value)
    if (human1 > addNum || human1 < 1) { // if human number higher max number or less min number
        wrong.innerHTML = "Wrong number, please enter number from 1 to " + addN.value // wrong
        buttonHH1.disabled = true // continue work button add human number
        buttonHH1.style.opacity = "0.2"
    } else {
        buttonHH1.disabled = false // turn on button
        buttonHH1.style.opacity = "1"
    }
}

function addH2() { // button for add human number
    let human2 = parseFloat(numberHuman2.value)
    let addNum = parseFloat(addN.value)
    if (human2 > addNum || human2 < 1) { // if human number higher max number or less min number
        wrong.innerHTML = "Wrong number, please enter number from 1 to " + addN.value // wrong
        buttonHH2.disabled = true // continue work button add human number
        buttonHH2.style.opacity = "0.2"
    } else {
        buttonHH2.disabled = false // turn on button
        buttonHH2.style.opacity = "1"
    }
}

// Mod //

function startGameMod() {
    button2.disabled = true
    button2.style.opacity = "0.2"
    startGameMod = true
    startGame()
}

function restartGame() {
    button2.disabled = false
    button2.style.opacity = "1"
    button1.disabled = false
    button1.style.opacity = "1"
    restart.style.display = "none"
    sum1 = 0
    output.innerHTML = ""
    gameBlock.style.display = "none"
    button.disabled = false
    button.style.opacity = "1"
    output.innerHTML = ""
    result.style.display = "none"
    ff.style.display = "none"
    addN.value = 0
    start.value = 0
    ht.style.display = "none"
    numberHuman1.value = 0
    numberHuman2.value = 0
    fieldHH.style.display = "none"
    button1.style.display = "none"
    button2.disabled = false
    button2.style.opacity = "1"
    button2.style.display = "none"
    numberHuman.value = ""
    mn.innerHTML = ""
    currPlayer = undefined
    btContMod.style.display = "none"
    startGameMod = false
    startBTS.style.display = "block"
    alert1.innerHTML = ""
    wrong.innerHTML = ""
}

// Buttons //

button.addEventListener('click', startGame)
continueBT.addEventListener("click", continueGame)
numberHuman.addEventListener('input', addHN)
addN.addEventListener('input', alert)
buttonHT.addEventListener('click', buttonHumNum)
restart.addEventListener('click', restartGame)
buttonMH.addEventListener('click', function () {
    button.style.display = "block"
    button1.style.display = "none"
    button2.style.display = "none"
    ff.style.display = "block"
    btContMod.display = "none"
    startBTS.style.display = "none"
})
buttonHH.addEventListener('click', function () {
    ff.style.display = "block"
    button.style.display = "none"
    button1.style.display = "block"
    button2.style.display = "none"
    startBTS.style.display = "none"
})
button1.addEventListener('click', startGameHH)
contHH.addEventListener('click', continueGameHH)
buttonHH1.addEventListener('click', buttonHHNum1)
buttonHH2.addEventListener('click', buttonHHNum2)
numberHuman1.addEventListener('input', addH1)
numberHuman2.addEventListener('input', addH2)
btMOD.addEventListener('click', function () {
    ff.style.display = "block"
    button.style.display = "none"
    button1.style.display = "none"
    button2.style.display = "block"
    startBTS.style.display = "none"
})
button2.addEventListener('click', startGameMod)
btContMod.addEventListener('click', continueGame)