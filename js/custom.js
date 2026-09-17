const showToastMessage = (type, text, duration = 3000, callback = null) => {
    const bgColor = type === 'success' ? '#D9A21B' : (type === 'error' ? '#D71926' : '#08090B');
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

var totalCartItem = window.totalCartItem || 0;
window.totalCartItem = totalCartItem;

const incrementCartItem = (totalCart = '') => {
    // Check if cart icon counter is exist or not
    const cartIconCounter = document.querySelectorAll(`span.cart-icon-counter`)

    if (totalCart !== '') {
        totalCartItem = parseInt(totalCart, 10) || 0;
    } else {
        totalCartItem++;
    }
    window.totalCartItem = totalCartItem;

    cartIconCounter.forEach(el => el.innerText = totalCartItem);
}

const decrementCartItem = () => {
    totalCartItem = Math.max(0, (totalCartItem || 0) - 1);
    window.totalCartItem = totalCartItem;
    const cartIconCounter = document.querySelectorAll(`span.cart-icon-counter`);
    cartIconCounter.forEach(el => el.innerText = totalCartItem);
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
    if (!phone) return '';
    const phoneStr = phone.toString();
    const numberLength = phoneStr.length;
    let hiddenNumber = '';
    let counter = 0;
    for (let i = (numberLength - 1); i >= 0; i--) {
        hiddenNumber += counter < showDigits ? phoneStr[i] : "*";
        counter++;
    }
    return hiddenNumber.split('').reverse().join('');
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

/* =====================================================
   Mini Soccer 88 — Dynamic Auth State & User Menu
   ===================================================== */
function updateAuthUI() {
    const userMenu = document.querySelector('.user-menu');
    const mobileUserLinks = document.querySelector('.navbar-mobile-user-links');
    const authRole = sessionStorage.getItem('ms88_auth_role');
    const authUser = JSON.parse(sessionStorage.getItem('ms88_auth_user') || 'null');

    // Desktop Dropdown
    if (userMenu) {
        if (authRole === 'user' && authUser) {
            userMenu.innerHTML = `
                <li class="px-3 py-2 border-bottom" style="border-bottom:1px solid #F3F4F6 !important;">
                    <div class="fw-bold" style="font-size:13.5px; color:#111827 !important;">${authUser.name || 'Member 88'}</div>
                    <small style="font-size:11px; color:#6B7280 !important;">${authUser.team || 'Member Resmi'} • <span class="font-monospace" style="color:#D71926 !important; font-weight:700;">${authUser.id || ''}</span></small>
                </li>
                <li>
                    <a class="dropdown-item py-2" href="/user/index.html" style="color:#1F2937 !important; display:flex !important; align-items:center !important; gap:8px !important;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2" style="color:#1F2937 !important;"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="13" y2="12"></line></svg>
                        <span style="color:#1F2937 !important; font-weight:600;">Kartu & Portal Member</span>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item py-2" href="/user/index.html" style="color:#1F2937 !important; display:flex !important; align-items:center !important; gap:8px !important;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2" style="color:#1F2937 !important;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span style="color:#1F2937 !important; font-weight:600;">Riwayat Booking Saya</span>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item py-2" href="/sewa-lapangan.html" style="color:#1F2937 !important; display:flex !important; align-items:center !important; gap:8px !important;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2" style="color:#1F2937 !important;"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 10 16 14 16 16 12 12 8"></polygon></svg>
                        <span style="color:#1F2937 !important; font-weight:600;">Booking Lapangan Baru</span>
                    </a>
                </li>
                <li class="border-top" style="border-top:1px solid #F3F4F6 !important;">
                    <a class="dropdown-item py-2 text-danger" href="javascript:void(0)" onclick="logoutMS88()" style="color:#D71926 !important; display:flex !important; align-items:center !important; gap:8px !important; font-weight:700;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2" style="color:#D71926 !important;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span style="color:#D71926 !important; font-weight:700;">Keluar (Logout)</span>
                    </a>
                </li>
            `;
        } else if (authRole === 'admin' || sessionStorage.getItem('ms88_admin_logged_in') === '1') {
            userMenu.innerHTML = `
                <li class="px-3 py-2 border-bottom" style="border-bottom:1px solid #F3F4F6 !important;">
                    <div class="fw-bold" style="font-size:13.5px; color:#111827 !important;">Super Administrator</div>
                    <small class="badge bg-warning text-dark font-monospace" style="font-size:10px;">ROOT ADMIN</small>
                </li>
                <li>
                    <a class="dropdown-item py-2" href="/superadmin/index.html" style="color:#1F2937 !important; display:flex !important; align-items:center !important; gap:8px !important;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2" style="color:#1F2937 !important;"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        <span style="color:#1F2937 !important; font-weight:600;">Dashboard Super Admin</span>
                    </a>
                </li>
                <li class="border-top" style="border-top:1px solid #F3F4F6 !important;">
                    <a class="dropdown-item py-2 text-danger" href="javascript:void(0)" onclick="logoutMS88()" style="color:#D71926 !important; display:flex !important; align-items:center !important; gap:8px !important; font-weight:700;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2" style="color:#D71926 !important;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span style="color:#D71926 !important; font-weight:700;">Keluar (Logout)</span>
                    </a>
                </li>
            `;
        } else {
            // Guest public view: strictly member login only, zero admin leakage
            userMenu.innerHTML = `
                <li class="px-3 py-2 border-bottom" style="border-bottom:1px solid #F3F4F6 !important;">
                    <div class="fw-bold" style="font-size:13px; color:#111827 !important;">Akun Mini Soccer 88</div>
                    <small style="font-size:11px; color:#6B7280 !important;">Masuk untuk kemudahan reservasi</small>
                </li>
                <li>
                    <a class="dropdown-item py-2 fw-bold text-danger" href="/login.html" style="color:#D71926 !important; display:flex !important; align-items:center !important; gap:8px !important;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2" style="color:#D71926 !important;"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                        <span style="color:#D71926 !important; font-weight:700;">Masuk / Daftar Member</span>
                    </a>
                </li>
            `;
        }
    }

    // Mobile User Links
    if (mobileUserLinks) {
        if (authRole === 'user' && authUser) {
            mobileUserLinks.innerHTML = `
                <a href="/user/index.html" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400" style="color: #25282B;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: #E8E8E8; flex-shrink: 0;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    Portal Member (${authUser.name ? authUser.name.split(' ')[0] : 'Member'})
                </a>
                <a href="javascript:void(0)" onclick="logoutMS88()" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400 text-danger" style="padding-bottom: 0 !important;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: rgba(215,25,38,0.12); flex-shrink: 0;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </span>
                    Keluar (Logout)
                </a>
                <a href="javascript:void(0)" onclick="window.MS88PWA && window.MS88PWA.showInstallModal()" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400" style="color: #D71926; font-weight: 700;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: rgba(215,25,38,0.12); flex-shrink: 0; font-size: 13px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </span>
                    Install Aplikasi PWA
                </a>
            `;
        } else if (authRole === 'admin' || sessionStorage.getItem('ms88_admin_logged_in') === '1') {
            mobileUserLinks.innerHTML = `
                <a href="/superadmin/index.html" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400" style="color: #25282B;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: #E8E8E8; flex-shrink: 0;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </span>
                    Dashboard Super Admin
                </a>
                <a href="javascript:void(0)" onclick="logoutMS88()" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400 text-danger" style="padding-bottom: 0 !important;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: rgba(215,25,38,0.12); flex-shrink: 0;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </span>
                    Keluar (Logout)
                </a>
                <a href="javascript:void(0)" onclick="window.MS88PWA && window.MS88PWA.showInstallModal()" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400" style="color: #D71926; font-weight: 700;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: rgba(215,25,38,0.12); flex-shrink: 0; font-size: 13px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </span>
                    Install Aplikasi PWA
                </a>
            `;
        } else {
            // Guest public view: strictly member login only, zero admin leakage
            mobileUserLinks.innerHTML = `
                <a href="/login.html" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400" style="color: #25282B;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: #E8E8E8; flex-shrink: 0;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                    </span>
                    Masuk / Daftar Member
                </a>
                <a href="javascript:void(0)" onclick="window.MS88PWA && window.MS88PWA.showInstallModal()" class="navbar-mobile-user-link d-flex align-items-center py-2 text-decoration-none s16-400" style="color: #D71926; font-weight: 700; padding-bottom: 0 !important;">
                    <span class="navbar-mobile-user-link-icon rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 24px; height: 24px; background: rgba(215,25,38,0.12); flex-shrink: 0; font-size: 13px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </span>
                    Install Aplikasi PWA
                </a>
            `;
        }
    }
}

function logoutMS88() {
    sessionStorage.removeItem('ms88_auth_user');
    sessionStorage.removeItem('ms88_auth_role');
    sessionStorage.removeItem('ms88_admin_logged_in');
    location.reload();
}

window.addEventListener('DOMContentLoaded', updateAuthUI);
