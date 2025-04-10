document.getElementById("logoutBtn").addEventListener("click", function () {
  if (confirm("Bạn có chắc muốn đăng xuất không?")) {
    // Xóa session/localStorage nếu cần
    localStorage.removeItem("user"); // Ví dụ nếu có lưu thông tin user
    sessionStorage.clear(); // Xoá hết session nếu dùng

    // Chuyển hướng về trang đăng nhập
    window.location.href = "log-in.html";
  }
});
