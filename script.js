//Complete the given scaffold to implement all the functionalities mentioned in the problem Statement.
const sentences =
    `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`
    ;
let length_of_string = sentences.replaceAll(" ", "");
let start_test_btn = document.getElementById('start-btn');
let text_input = document.getElementById('input');
let sentence = document.getElementById('sentence');
let timer_display = document.getElementById('timer');
let clock_started = false;
let counter = 30;
let typed_sentence = "";
let correct_word_count = 0;
let letter_correct_count = 0;
let result_section = document.getElementById('result');
let accuracy_display = document.getElementById('accuracy');
let wpm_display = document.getElementById('speed');
function checkingSpeed() {
    text_input.disabled = true;
    start_test_btn.disabled = true;
    result_section.style.display = "block";
    let sentence_array = typed_sentence.replaceAll('\n', '');
    let words_array = typed_sentence.split(" ");
    let sentence_word = sentences.replaceAll('\n', '');
    let sentence_word_array = sentences.split(" ");

    for (let i = 0; i < words_array.length; i++) {
        let correct_word = true;
        let arr1 = [...words_array[i]];
        let arr2 = [...sentence_word_array[i]];
        for (let j = 0; j < arr1.length; j++) {
            console.log(arr1[j], arr2[j]);
            if (arr1[j] == arr2[j]) {
                letter_correct_count++;
            }
            else if (arr1[j] != arr2[j]) {
                correct_word = false;
            }
        }
        if (correct_word) {
            correct_word_count++;
        }
    }
    console.log(correct_word_count, letter_correct_count);
    let accuracy = (letter_correct_count / length_of_string.length) * 100;
    accuracy_display.textContent = accuracy.toFixed(2);
    let wpm = (correct_word_count / 30) * 60;
    wpm_display.textContent = wpm;

    let retrybtn = document.getElementById('retry-btn');
    retrybtn.addEventListener('click', function () {
        text_input.value = "";
        text_input.disabled = true;
        typed_sentence = "";
        start_test_btn.disabled = false;
        result_section.style.display = "none";

    })

}



// checkingSpeed();
function timer() {
    clock_started = true;
    let timesup = setInterval(function () {
        if (counter <= 0) {
            checkingSpeed();
            clearInterval(timesup);
        }
        if (counter < 10) {
            timer_display.textContent = '00:0' + counter;
        }
        else {
            timer_display.textContent = '00:' + counter;
        }
        counter--;
    }, 1000)
}


start_test_btn.addEventListener('click', function () {
    sentence.textContent = sentences;
    text_input.disabled = false;
    text_input.focus();
    text_input.addEventListener('keydown', function (event) {
        console.log(event.keyCode)
        if (!clock_started) {
            timer();
        }
        if (event.key == 'Backspace') {
            typed_sentence = typed_sentence.slice(0, typed_sentence.length - 1);
            console.log(typed_sentence);
        }
        else if (event.key == 'Shift') {
            typed_sentence += "";
        }
        else {
            typed_sentence += event.key;
        }
    })

});