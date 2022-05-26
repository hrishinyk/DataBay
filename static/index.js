const container = document.querySelector(".containerLogin"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    login = document.querySelector(".login-link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon1 => {
                    icon1.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon1 => {
                    icon1.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})


// signUp.addEventListener("click", () => {
//     container.classList.add("active");
// });
// login.addEventListener("click", () => {
//     container.classList.remove("active");
// });

console.log("Here");

let all_btn = document.querySelectorAll(".click");
let all_list = document.querySelectorAll(".list");

for (let i = 0; i < all_btn.length; i++) {
    all_btn[i].addEventListener("click", () => {
        all_list[i].classList.toggle('newlist');
    })
}

function menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active')
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const faq = button.nextElementSibling;
        const icon = button.children[1];

        faq.classList.toggle('show');
        //icon.classList.toggle('rotate');
    })
})