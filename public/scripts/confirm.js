const showButton = document.querySelector('.showButton');
const showedButton = document.querySelector('.confirmForm');
showButton.addEventListener('click', function() {
    showedButton.classList.toggle('hidden')
    test();
});
function test () {
    const form = document.querySelector("#form");
    form.addEventListener("input", () => {
        if(form.confirmText.value.toLowerCase() === form.equals.value.toLowerCase()) {
            document.querySelector('.deleteButton').classList.toggle('hidden');
        }
    });
}
