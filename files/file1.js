
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            else {
                event.preventDefault()
                resetForm()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()


let resetForm = () => {
    document.querySelector(".alert").classList.remove('d-none')
    // Reset inputs
    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    inputs.forEach(input => {
        input.value = ""
        input.checked = false
    });

    // Reset select
    selects.forEach(select => {
        select.value = ""
    });
}
