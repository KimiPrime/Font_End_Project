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
        .querySelector(".status-wrapper")
        .innerText.trim()
        .toLowerCase();
      const tenBaiHoc = row.children[1].innerText.toLowerCase();

      let rowStatus = "";
      if (statusText.includes("đã hoàn thành")) {
        rowStatus = "active";
      } else if (statusText.includes("chưa hoàn thành")) {
        rowStatus = "inactive";
      }

      const matchesStatus =
        selectedStatus === "all" || selectedStatus === rowStatus;
      const matchesSearch = tenBaiHoc.includes(keyword);

      return matchesStatus && matchesSearch;
    });

    currentPage = 1;
    paginate();
  }

  filterSelect.addEventListener("change", filterRows);
  searchBox.addEventListener("input", filterRows);

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
      if (e.target.classList.contains("prev") && currentPage > 1) {
        currentPage--;
      } else if (
        e.target.classList.contains("next") &&
        currentPage < pageCount
      ) {
        currentPage++;
      } else if (e.target.dataset.page) {
        currentPage = parseInt(e.target.dataset.page);
      }
      paginate();
    }
  });
  // ====== SẮP XẾP THEO TÊN BÀI HỌC ======
  let sortDirection = "asc"; // Mặc định A-Z

  const sortHeader = document.querySelector(".sort-name");
  sortHeader.style.cursor = "pointer";
  sortHeader.addEventListener("click", function () {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";

    filteredRows.sort((a, b) => {
      const nameA = a.children[1].innerText.toLowerCase();
      const nameB = b.children[1].innerText.toLowerCase();

      if (sortDirection === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    currentPage = 1;
    paginate();
  });

  // Lần đầu load
  filterRows();
});
