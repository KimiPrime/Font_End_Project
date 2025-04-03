document.getElementById("dongY").addEventListener("change", function () {
  document.getElementById("btnDangKy").disabled = !this.checked;
});

document.getElementById("btnDangKy").addEventListener("click", function () {
  const hoTenDem = document.getElementById("hoTenDem").value.trim();
  const ten = document.getElementById("ten").value.trim();
  const email = document.getElementById("email").value.trim();
  const matKhau = document.getElementById("matKhau").value.trim();

  if (!hoTenDem || !ten || !email || !matKhau) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  alert("Đăng ký thành công!");
});
