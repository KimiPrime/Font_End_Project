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
