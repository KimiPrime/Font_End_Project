document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = document.getElementById("statusFilter");
  const searchBox = document.querySelector(".search-box");
  const pagination = document.querySelector(".pagination");
  const rowsPerPage = 6;
  let currentPage = 1;
  let filteredRows = [];

  function getAllRows() {
    return Array.from(document.querySelectorAll("table tbody tr"));
  }

  function filterRows() {
    const selectedStatus = filterSelect.value;
    const keyword = searchBox.value.trim().toLowerCase();
    const allRows = getAllRows();

    filteredRows = allRows.filter((row) => {
      const statusText = row
        .querySelector(".status-box span")
        .innerText.trim()
        .toLowerCase();
      const tenBaiHoc = row.querySelector("td").innerText.toLowerCase();

      let rowStatus = "";
      if (statusText === "đang hoạt động") {
        rowStatus = "active";
      } else if (statusText === "ngừng hoạt động") {
        rowStatus = "inactive";
      }

      let matchesStatus =
        selectedStatus === "all" || selectedStatus === rowStatus;

      let matchesSearch = tenBaiHoc.includes(keyword);
      return matchesStatus && matchesSearch;
    });

    currentPage = 1;
    paginate();
  }

  filterSelect.addEventListener("change", filterRows);
  searchBox.addEventListener("input", filterRows);

  // Popup form
  window.hienForm = function () {
    document.getElementById("formMonHoc").style.display = "block";
  };

  window.hienFormEdit = function () {
    document.getElementById("formMonHocEdit").style.display = "block";
  };

  window.anForm = function () {
    document.getElementById("formMonHoc").style.display = "none";
  };

  window.anFormEdit = function () {
    document.getElementById("formMonHocEdit").style.display = "none";
  };

  document.getElementById("closeModal").addEventListener("click", anForm);

  // Lưu bài học mới
  window.luuMon = function () {
    const tenMon = document.getElementById("tenMon").value.trim();
    const statusRadio = document.querySelector('input[name="status"]:checked');

    if (!tenMon) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập tên bài học.",
      });
      return;
    }

    if (!statusRadio) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng chọn trạng thái.",
      });
      return;
    }

    const statusValue = statusRadio.value;
    const statusText =
      statusValue === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
    const statusClass = statusValue === "active" ? "completed" : "pending";
    const statusImg =
      statusValue === "active" ? "../assist/Dot.png" : "../assist/Dotred.png";

    const tableBody = document.querySelector("table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${tenMon}</td>
      <td>
        <div class="status-box ${statusClass}">
          <img src="${statusImg}" />
          <span>${statusText}</span>
        </div>
      </td>
      <td>
        <button class="edit">
          <img src="../assist/edit-2.png" alt="Edit" />
        </button>
        <button class="delete">
          <img src="../assist/trash-2.png" alt="Delete" />
        </button>
      </td>
    `;
    tableBody.appendChild(newRow);

    anForm();
    document.querySelector("#formMonHoc form").reset();
    filterRows();
  };

  window.updateMon = function () {
    const tenMon = document.getElementById("tenMon").value.trim();
    const statusRadio = document.querySelector('input[name="status"]:checked');

    if (!tenMon || !statusRadio) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập tên và chọn trạng thái.",
      });
      return;
    }

    const statusValue = statusRadio.value;
    const statusText =
      statusValue === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
    const statusClass = statusValue === "active" ? "completed" : "pending";
    const statusImg =
      statusValue === "active" ? "../assist/Dot.png" : "../assist/Dotred.png";

    if (rowDangChinhSua) {
      rowDangChinhSua.children[0].innerText = tenMon;
      const statusBox = rowDangChinhSua.querySelector(".status-box");
      statusBox.className = `status-box ${statusClass}`;
      statusBox.innerHTML = `<img src="${statusImg}" /><span>${statusText}</span>`;
      rowDangChinhSua = null;
    }
    anForm();
    filterRows();
  };

  function paginate() {
    const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
    pagination.innerHTML = `<button class="prev">«</button>`;

    for (let i = 1; i <= pageCount; i++) {
      pagination.innerHTML += `<button class="${
        i === currentPage ? "active" : ""
      }" data-page="${i}">${i}</button>`;
    }

    pagination.innerHTML += `<button class="next">»</button>`;
    showPage(currentPage);
  }

  function showPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    getAllRows().forEach((row) => (row.style.display = "none"));

    filteredRows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });
  }

  pagination.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

      if (e.target.classList.contains("prev")) {
        if (currentPage > 1) currentPage--;
      } else if (e.target.classList.contains("next")) {
        if (currentPage < pageCount) currentPage++;
      } else {
        currentPage = parseInt(e.target.dataset.page);
      }

      paginate();
    }
  });

  // Lần đầu tải
  filterRows();
});

let rowDangChinhSua = null;

document.querySelector("table").addEventListener("click", function (e) {
  const editBtn = e.target.closest(".edit");
  if (editBtn) {
    const row = editBtn.closest("tr");
    const tenMon = row.children[0].innerText.trim();
    const statusText = row.querySelector(".status-box span").innerText.trim();

    document.getElementById("tenMonEdit").value = tenMon;
    const statusValue = statusText === "Đang hoạt động" ? "active" : "inactive";
    document.querySelector(
      `#formMonHocEdit input[name="status"][value="${statusValue}"]`
    ).checked = true;

    rowDangChinhSua = row;

    hienFormEdit();
  }
});

// Xóa
document.querySelector("table").addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    const row = e.target.closest("tr");
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Môn học này sẽ bị xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        row.remove();
        Swal.fire({
          icon: "success",
          title: "Đã xóa!",
          text: "Môn học đã được xóa.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
});

window.luuMonEdit = function () {
  const tenMon = document.getElementById("tenMonEdit").value.trim();
  const statusRadio = document.querySelector(
    '#formMonHocEdit input[name="status"]:checked'
  );

  if (!tenMon || !statusRadio) {
    Swal.fire({
      icon: "warning",
      title: "Thiếu thông tin",
      text: "Vui lòng nhập tên và chọn trạng thái.",
    });
    return;
  }

  const statusValue = statusRadio.value;
  const statusText =
    statusValue === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
  const statusClass = statusValue === "active" ? "completed" : "pending";
  const statusImg =
    statusValue === "active" ? "../assist/Dot.png" : "../assist/Dotred.png";

  if (rowDangChinhSua) {
    rowDangChinhSua.children[0].innerText = tenMon;
    const statusBox = rowDangChinhSua.querySelector(".status-box");
    statusBox.className = `status-box ${statusClass}`;
    statusBox.innerHTML = `<img src="${statusImg}" /><span>${statusText}</span>`;

    rowDangChinhSua = null;
    anFormEdit();
    filterRows();
  }
};
