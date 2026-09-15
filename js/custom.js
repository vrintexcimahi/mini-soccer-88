const showToastMessage = (type, text, duration = 3000, callback = null) => {
    const bgColor = type === 'success' ? '#00C48C' : (type === 'error' ? '#ed3d3d' : '#9ea9b4');
    Toastify.multiple = false;
    // hide existing
    document.querySelectorAll('.toastify').forEach((el) => el.remove());

    Toastify({
        text: text,
        duration: duration,
        close: true,
        gravity: 'bottom',
        position: "center",
        stopOnFocus: true,
        style: {
            background: bgColor,
        },
        callback: callback
    }).showToast();
}

const convertToIDR = (str, usingRp = false) => {
    const flag = usingRp ? 'Rp' : '';
    const amount = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${flag}${amount}`;
}

const createGmapsUrl = (latitude, longitude) => `https://maps.google.com/?q=${latitude},${longitude}`;

const open_map = (lat, lng) => window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank').focus();

const incrementCartItem = (totalCart = '') => {
    // Check if cart icon counter is exist or not
    const cartIconCounter = document.querySelectorAll(`span.cart-icon-counter`)

    if (totalCart !== '') {
        totalCartItem = parseInt(totalCart);
    } else {
        totalCartItem++;
    }

    cartIconCounter.forEach(el => el.innerText = totalCartItem);
}

const decrementCartItem = () => {
    totalCartItem--;
    const cartIconCounter = document.querySelectorAll(`a.venue-cart-view-btn span.cart-icon-counter`)
    cartIconCounter.forEach(el => el.innerText = totalCartItem > 0 ? totalCartItem : 0);
}

/**
 * @note Custom toggle modal
 * @param modalId
 */
const toggleModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }

    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop', 'fade', 'show', `modal-backdrop-${modalId}`);

    if (getComputedStyle(modal).display === "block") {
        // Do hide the modal
        modal.classList.remove('show');

        const modalBackdrop = document.querySelector(`.modal-backdrop-${modalId}`);
        if (modalBackdrop) {
            modalBackdrop.remove();
        }

        modal.classList.remove("modal-show", "modal-hide");
        modal.style.display = "none";

        // Hanya bersihkan sisa backdrop custom (yang bernamespace `modal-backdrop-*`).
        // JANGAN menyapu `.modal-backdrop` milik Bootstrap, karena modal Bootstrap
        // yang sedang terbuka (mis. detail booking) masih membutuhkan overlay-nya.
        document.querySelectorAll('[class*="modal-backdrop-"]')
            .forEach((el) => el.remove());

        // Lepas scroll-lock body HANYA bila tidak ada modal lain yang masih terbuka.
        // Kalau masih ada modal Bootstrap aktif, biarkan Bootstrap yang mengelola
        // overflow & padding body supaya scroll-lock tidak bocor.
        const hasOtherOpenModal = document.querySelector('.modal.show, .modal-backdrop');
        if (!hasOtherOpenModal) {
            document.body.style.overflow = "initial";
            document.body.style.paddingRight = '0';
        }
    } else {
        // Do show modal
        modal.style.display = "block";
        modal.classList.add("show");
        document.body.append(backdrop);
    }
}

/**
 * @note Escape and parse json string
 * @param jsonString
 * @returns {null|any}
 */
const parseJsonString = (jsonString) => {
    try {
        const jsonStr = jsonString.toString().replace(/\n/g,'<br>');
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error(`Error parseJsonString: ${error}`);
        return null;
    }
}

/**
 * @note Masking phone number
 * @param phone
 * @param showDigits
 * @returns {string}
 */
const maskingPhoneNumber = (phone, showDigits = 4) => {
    {
        let numberLength = phone.toString().length;
        let hiddenNumber = '';
        let counter = 0;
        for (let i = (numberLength - 1); i > 0; i--) {
            hiddenNumber += counter <= showDigits ? phone[i] : "*";
            counter++;
        }
        return hiddenNumber.split('').reverse().join('');
    }
}


const copyTextToClipboard = (uniqueIdentifyElementSelector, textToCopy) => {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showToastMessage('info', 'Successfully copied text to the clipboard.', 3000);
            }).catch((err) => {
                console.error('Error during copy text to the clipboard on secured context.');
            });
    } else {
        const elm = document.getElementById(`${uniqueIdentifyElementSelector}`);
        elm.focus();
        elm.select();

        try {
            document.execCommand('copy');
            showToastMessage('info', 'Successfully copied text to the clipboard.', 3000);
        } catch (err) {
            console.error('Error during copy text to the clipboard:' + err);
        }
    }
}

function enableButton(element, isEnabled = false){
    if (element) {
        if (isEnabled) {
            element.classList.add('btn-ayo-red');
            element.classList.remove('btn-ayo-gray');
            element.removeAttribute('disabled');
        } else {
            element.classList.remove('btn-ayo-red');
            element.classList.add('btn-ayo-gray');
            element.setAttribute('disabled', 'disabled');
        }
    }
}

function showElement(element, isShow = true) {
    if (element) {
        if (isShow) {
            element.classList.remove('d-none');
            element.classList.add('d-block');
        } else {
            element.classList.remove('d-block', 'd-flex');
            element.classList.add('d-none');
        }
    }
}

function setReadableInput(element, isReadOnly = true) {
    if (element) {
        if (isReadOnly) {
            element.setAttribute('readonly', 'readonly');
        } else {
            element.removeAttribute('readonly');
        }
    }
}
