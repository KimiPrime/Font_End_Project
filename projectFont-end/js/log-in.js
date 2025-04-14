function updateResponsiveContent() {
  const title = document.querySelector("#title h1");
  const description = document.getElementById("description");
  const options = document.getElementById("options");
  const terms = document.getElementById("terms");
  const registerLink = document.getElementById("register-link");

  if (window.innerWidth <= 400) {
    title.textContent = "Đăng nhập tài khoản";
    description.textContent = "Đăng nhập tài khoản để sử dụng dịch vụ.";
    options.style.display = "none";
    terms.style.display = "block";
    registerLink.style.display = "none";
  } else {
    title.textContent = "Đăng nhập ";
    description.textContent =
      "Đăng nhập tài khoản để sử dụng hệ thống quản lý.";
    options.style.display = "flex";
    terms.style.display = "none";
    registerLink.style.display = "block";
  }
}

window.addEventListener("load", updateResponsiveContent);
window.addEventListener("resize", updateResponsiveContent);

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn form gửi đi mặc định

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const userData = localStorage.getItem(`user_${email}`);

  if (!userData) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Tài khoản không tồn tại!",
    });
    return;
  }

  const user = JSON.parse(userData);

  if (user.matKhau !== password) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Mật khẩu không chính xác!",
    });
    return;
  }

  // Đăng nhập thành công
  Swal.fire({
    icon: "success",
    title: "Thành công",
    text: "Đăng nhập thành công!",
    confirmButtonText: "Tiếp tục",
  }).then(() => {
    window.location.href = "../pages/home-page.html";
  });
});
