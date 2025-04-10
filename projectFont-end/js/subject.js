// --- TÌM KIẾM ---
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("input", function () {
  filterSubjects();
});

// --- CHỈNH SỬA ---
function handleEdit(btn) {
  const row = btn.closest("tr");
  const name = row.querySelector("td:first-child").textContent;
  alert(`Bạn đang chỉnh sửa môn học: ${name}`);
}

// --- XÓA ---
function handleDelete(btn) {
  if (confirm("Bạn có chắc muốn xóa môn học này không?")) {
    btn.closest("tr").remove();
  }
}

// Gán lại các nút sau khi tạo mới
function bindRowEvents(row) {
  row.querySelector(".edit").addEventListener("click", function () {
    handleEdit(this);
  });
  row.querySelector(".delete").addEventListener("click", function () {
    handleDelete(this);
  });
}

// --- LỌC THEO TRẠNG THÁI ---
const filterSelect = document.getElementById("statusFilter");
filterSelect.addEventListener("change", function () {
  filterSubjects();
});

// --- LỌC KẾT HỢP TÌM KIẾM & TRẠNG THÁI ---
function filterSubjects() {
  const searchValue = searchBox.value.toLowerCase();
  const filterValue = filterSelect.value;
  const rows = document.querySelectorAll("table tbody tr");

  rows.forEach((row) => {
    const name = row.querySelector("td:first-child").textContent.toLowerCase();
    const statusText = row.querySelector(".status-box span").textContent.trim();

    const matchesSearch = name.includes(searchValue);
    const matchesStatus =
      filterValue === "all" ||
      (filterValue === "active" && statusText === "Đang hoạt động") ||
      (filterValue === "inactive" && statusText === "Ngừng hoạt động");

    row.style.display = matchesSearch && matchesStatus ? "" : "none";
  });
}

// --- THÊM MỚI MÔN HỌC () ---
const addButton = document.querySelector(".add-btn");
addButton.addEventListener("click", function () {
  const subjectName = prompt("Nhập tên môn học mới:");
  if (!subjectName) return;

  const isActive = confirm("Môn học này đang hoạt động?");
  const statusClass = isActive ? "completed" : "pending";
  const statusText = isActive ? "Đang hoạt động" : "Ngừng hoạt động";
  const dotImg = isActive ? "../assist/Dot.png" : "../assist/Dotred.png";

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${subjectName}</td>
    <td>
      <div class="status-box ${statusClass}">
        <img src="${dotImg}" />
        <span>${statusText}</span>
      </div>
    </td>
    <td>
      <button class="edit"><img src="../assist/edit-2.png" alt="Edit" /></button>
      <button class="delete"><img src="../assist/trash-2.png" alt="Delete" /></button>
    </td>
  `;

  document.querySelector("table tbody").appendChild(newRow);
  bindRowEvents(newRow);
});

// Gán sự kiện cho các hàng có sẵn ban đầu
document.querySelectorAll("table tbody tr").forEach(bindRowEvents);
