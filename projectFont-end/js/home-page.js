document.getElementById("logoutBtn").addEventListener("click", function () {
  if (confirm("Bạn có chắc muốn đăng xuất không?")) {
    // Xóa session/localStorage nếu cần
    localStorage.removeItem("user"); // Ví dụ nếu có lưu thông tin user
    sessionStorage.clear(); // Xoá hết session nếu dùng

    // Chuyển hướng về trang đăng nhập
    window.location.href = "log-in.html";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar .nav-left a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const text = link.textContent.trim();

      if (text === "Môn học") {
        window.location.href = "../pages/subject.html";
      } else if (text === "Bài học") {
        window.location.href = "../pages/lesson.html";
      } else if (text === "Trang chủ") {
        window.location.href = "../pages/home-page.html";
      }
    });
  });
});
