let all_btn = document.querySelectorAll(".click");
let all_list = document.querySelectorAll(".list");

for (let i = 0; i < all_btn.length; i++) {
    all_btn[i].addEventListener("click", () => {
        all_list[i].classList.toggle('newlist');
    })
}