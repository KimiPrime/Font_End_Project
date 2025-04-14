const hoTenDemEl = document.getElementById("hoTenDem");
const tenEl = document.getElementById("ten");
const emailEl = document.getElementById("email");
const matKhauEl = document.getElementById("matKhau");
const xacNhanMatKhauEl = document.getElementById("xacNhanMatKhau");
const dongYEl = document.getElementById("dongY");
const btnDangKy = document.getElementById("btnDangKy");

// Hàm kiểm tra định dạng email có hợp lệ không
function laEmailHopLe(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Hàm kiểm tra xem form đã hợp lệ để bật nút "Đăng ký" hay chưa
function kiemTraHopLe() {
  const hoTenDem = hoTenDemEl.value.trim(); // loại bỏ khoảng trắng
  const ten = tenEl.value.trim();
  const email = emailEl.value.trim();
  const matKhau = matKhauEl.value.trim();
  const xacNhanMatKhau = xacNhanMatKhauEl.value.trim();
  const dongY = dongYEl.checked; // true/false

  // Kiểm tra tất cả điều kiện:
  const hopLe =
    hoTenDem && // đã nhập họ tên đệm
    ten && // đã nhập tên
    laEmailHopLe(email) && // email hợp lệ
    matKhau.length >= 8 && // mật khẩu >= 8 ký tự
    matKhau === xacNhanMatKhau && // xác nhận lại mật khẩu
    dongY; // đã tích đồng ý

  // Nếu tất cả hợp lệ, nút được bật (disabled = false)
  btnDangKy.disabled = !hopLe;
}

// Gắn sự kiện "input" để kiểm tra mỗi khi người dùng gõ vào các ô input
[hoTenDemEl, tenEl, emailEl, matKhauEl, xacNhanMatKhauEl].forEach((input) =>
  input.addEventListener("input", kiemTraHopLe)
);

// Gắn sự kiện "change" cho checkbox để kiểm tra khi người dùng click checkbox
dongYEl.addEventListener("change", kiemTraHopLe);

// Sự kiện khi người dùng click nút "Đăng ký"
btnDangKy.addEventListener("click", function () {
  const user = {
    hoTenDem: hoTenDemEl.value.trim(),
    ten: tenEl.value.trim(),
    email: emailEl.value.trim(),
    matKhau: matKhauEl.value.trim(),
  };

  localStorage.setItem(`user_${user.email}`, JSON.stringify(user));

  // Hiển thị alert và đợi người dùng bấm OK rồi mới chuyển trang
  Swal.fire({
    title: "Good job!",
    text: "Đăng ký thành công!",
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    // Sau khi người dùng bấm OK mới chuyển trang
    window.location.href = "../pages/log-in.html";
  });

  // Xóa dữ liệu form (nếu muốn giữ lại thì để trong phần .then)
  hoTenDemEl.value = "";
  tenEl.value = "";
  emailEl.value = "";
  matKhauEl.value = "";
  xacNhanMatKhauEl.value = "";
  dongYEl.checked = false;
});
