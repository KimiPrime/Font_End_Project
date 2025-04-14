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
        .querySelector(".status-wrapper span")
        .innerText.trim()
        .toLowerCase();
      const lessonName = row.querySelector("td").innerText.toLowerCase();

      let rowStatus = "";
      if (statusText === "đang hoạt động") {
        rowStatus = "active";
      } else if (statusText === "ngừng hoạt động") {
        rowStatus = "inactive";
      }

      let matchesStatus =
        selectedStatus === "all" || selectedStatus === rowStatus;

      let matchesSearch = lessonName.includes(keyword);
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

  // Sửa hàm luuMon để hỗ trợ cập nhật
  window.luuMon = function () {
    const tenMon = document.getElementById("tenMon").value.trim();
    const statusRadio = document.querySelector('input[name="status"]:checked');

    if (!tenMon) {
      alert("Vui lòng nhập tên bài học.");
      return;
    }

    if (!statusRadio) {
      alert("Vui lòng chọn trạng thái.");
      return;
    }

    const statusValue = statusRadio.value;
    const statusText =
      statusValue === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
    const statusClass = statusValue === "active" ? "completed" : "pending";
    const statusImg =
      statusValue === "active" ? "../assist/Dot.png" : "../assist/Dotred.png";

    if (rowDangChinhSua) {
      // Cập nhật tên môn học
      rowDangChinhSua.children[1].innerText = tenMon;

      // Cập nhật trạng thái
      const statusBox = rowDangChinhSua.querySelector(".status-wrapper");
      statusBox.className = `status-wrapper ${statusClass}`;
      statusBox.innerHTML = `<img src="${statusImg}" /><span>${statusText}</span>`;

      // Reset
      rowDangChinhSua = null;
    } else {
      // Thêm mới
      const tableBody = document.querySelector("table tbody");
      const newRow = document.createElement("tr");
      const row = e.target.closest("tr");
      newRow.innerHTML = `
          <td><input type="checkbox" /></td>
          <td>${tenMon}</td>
          <td>
            <div class="status-wrapper ${statusClass}">
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
      row.remove();
    }

    anForm();
    document.querySelector("#formMonHoc form").reset();
    filterRows(); // cập nhật lại danh sách
  };

  // Lưu bài học mới
  window.luuMon = function () {
    const tenMon = document.getElementById("tenMon").value.trim();
    const statusRadio = document.querySelector('input[name="status"]:checked');
    if (!tenMon || !statusRadio) {
      alert("Vui lòng nhập tên và chọn trạng thái.");
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
      <td><input type="checkbox" /></td>
      <td>${tenMon}</td>
      <td>
        <div class="status-wrapper ${statusClass}">
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
    filterRows(); // Update filter and pagination
  };

  // Function for editing an existing lesson
  window.updateMon = function () {
    const tenMon = document.getElementById("tenMon").value.trim();
    const statusRadio = document.querySelector('input[name="status"]:checked');
    if (!tenMon || !statusRadio) {
      alert("Vui lòng nhập tên và chọn trạng thái.");
      return;
    }

    const statusValue = statusRadio.value;
    const statusText =
      statusValue === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
    const statusClass = statusValue === "active" ? "completed" : "pending";
    const statusImg =
      statusValue === "active" ? "../assist/Dot.png" : "../assist/Dotred.png";

    // If editing
    if (rowDangChinhSua) {
      rowDangChinhSua.children[1].innerText = tenMon;
      const statusBox = rowDangChinhSua.querySelector(".status-wrapper");
      statusBox.className = `status-wrapper ${statusClass}`;
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

    getAllRows().forEach((row) => (row.style.display = "none")); // Ẩn tất cả

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
    const tenMon = row.children[1].innerText.trim();
    const statusText = row
      .querySelector(".status-wrapper span")
      .innerText.trim();

    // Use the EDIT form fields instead of the ADD form
    document.getElementById("tenMonEdit").value = tenMon;
    const statusValue = statusText === "Đang hoạt động" ? "active" : "inactive";
    document.querySelector(
      `#formMonHocEdit input[name="status"][value="${statusValue}"]`
    ).checked = true;

    rowDangChinhSua = row;

    hienFormEdit(); // Show the edit modal
  }
});

//xoa
document.querySelector("table").addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    const row = e.target.closest("tr");
    if (confirm("Bạn có chắc chắn muốn xóa môn học này không?")) {
      row.remove();
    }
  }
});

window.luuMonEdit = function () {
  const tenMon = document.getElementById("tenMonEdit").value.trim();
  const statusRadio = document.querySelector(
    '#formMonHocEdit input[name="status"]:checked'
  );

  if (!tenMon || !statusRadio) {
    alert("Vui lòng nhập tên và chọn trạng thái.");
    return;
  }

  const statusValue = statusRadio.value;
  const statusText =
    statusValue === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
  const statusClass = statusValue === "active" ? "completed" : "pending";
  const statusImg =
    statusValue === "active" ? "../assist/Dot.png" : "../assist/Dotred.png";

  if (rowDangChinhSua) {
    // Update the table row
    rowDangChinhSua.children[1].innerText = tenMon;
    const statusBox = rowDangChinhSua.querySelector(".status-wrapper");
    statusBox.className = `status-wrapper ${statusClass}`;
    statusBox.innerHTML = `<img src="${statusImg}" /><span>${statusText}</span>`;

    rowDangChinhSua = null;
    anFormEdit();
    filterRows(); // Refresh filtered view
  }
};
