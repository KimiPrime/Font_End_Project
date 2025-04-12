// Lấy tên môn học từ URL
const urlParams = new URLSearchParams(window.location.search);
const subjectName = urlParams.get("name");

// Hiển thị tên môn học trong thông báo xác nhận
document.querySelector("strong").textContent = subjectName;

// Xử lý sự kiện xóa
document.getElementById("deleteBtn").addEventListener("click", function () {
  // Lấy dữ liệu môn học từ localStorage
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

  // Lọc để xóa môn học trong danh sách
  subjects = subjects.filter((subject) => subject.name !== subjectName);

  // Cập nhật lại localStorage
  localStorage.setItem("subjects", JSON.stringify(subjects));

  // Sau khi xóa, chuyển hướng về trang chính (hoặc làm mới trang)
  alert("Môn học đã bị xóa!");
  window.location.href = "../pages/subject.html"; // Hoặc tên của trang chính
});

// Hủy bỏ hành động xóa và đóng popup
document.getElementById("cancelBtn").addEventListener("click", function () {
  window.location.href = "../pages/subject.html"; // Hoặc tên của trang chính
});
