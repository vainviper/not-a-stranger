const showButton = document.querySelectorAll('.deleteButton');
const showedButton = document.querySelectorAll('.confirmForm');

showButton.forEach((button, index) => {
    button.addEventListener('click', function() {
    showedButton[index].classList.toggle('hidden')
    compareInput(index);
    });
});

function compareInput (index) {
    let form = document.querySelectorAll(".formHidden");
    formListening = form[index];
    formListening.addEventListener("input", () => {
        if(formListening.confirmText.value.toLowerCase() === formListening.equals.value.toLowerCase()) {
            let button = document.querySelectorAll('.confirmButton')
            let confirmBtn = button[index];
            confirmBtn.classList.toggle('hidden');
        }
    })
};
