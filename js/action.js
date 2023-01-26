"use strict";

const btn = document.querySelector('.btn-link');
const modal = document.querySelector('.modal-wrap');
const closeModal = document.querySelector('.cl-btn-2');
const btnSend = document.querySelector('.js-btn-send');
const errorNameText = document.querySelector('.js-error-name');
const errorPhoneText = document.querySelector('.js-error-phone');
const success = document.querySelector('.load-title');
const form = document.querySelector('.form-modal');
const descText = document.querySelector('.load-desc');

// modal open, close ___ start

btn.onclick = () => {
    modal.classList.add('modal-wrap-active');
    success.style.display = 'none';
    form.style.display = 'block';
    descText.style.display = 'block';

    closeModal.addEventListener('click', function() {
       modal.classList.remove('modal-wrap-active');
    });
}

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('modal-wrap-active');
    }
});

// modal open, close ___ end

btnSend.addEventListener('click', function() {
    errorNameText.style.display = 'none';
    errorPhoneText.style.display = 'none';

    let error = false;
    let name = document.querySelector('input[name="name-modal"]').value;
    let phone = document.querySelector('input[name="phone-modal"]').value;

    if (!/^[а-яА-Яa-zA-Z]{2,30}$/.test(name)) {
        showError('name');
        error = true;
    }

    if (!/^((\+7|7|8)+([0-9]){10})$/.test(phone)) {
        showError('phone');
        error = true;
    }

    if (!error) {
        fetch(
            'send.php', {
                method: 'POST',
                body: JSON.stringify({name: name, phone: phone}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            (result) => result.json()
        ).then(
            (result) => {
                if (result.success) {
                      // alert("Успешно!");
                    success.style.display = 'block';
                    form.style.display = 'none';
                    descText.style.display = 'none';
                    document.querySelector('input[name="name-modal"]').value = '';
                    document.querySelector('input[name="phone-modal"]').value = '';
                } else {
                    if (result.error == 'name') {
                        showError('name');
                    } else {
                        showError('phone');
                    }
                }
            }
        );
    }
});

function showError(fieldName) {
    // let nameField = document.querySelector('input[name="' + fieldName + '-modal"]');
    // nameField.classList.add('error-field');
    let errorText = document.querySelector('.js-error-' + fieldName);
    errorText.style.display = 'block';
}
