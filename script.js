$(document).ready(function () {
  $.getJSON("viewData.json", function (products) {
    let productData = {
      data: products.data,
      status: products.status,
    };

    function getAllData() {
      productData.data.forEach(function (product) {
        let tr = $("<tr>");
        let td1 = $("<td>").text(product.id);
        let td2 = $("<td>").text(product.productID);
        let td3 = $("<td>").text(product.productName);
        let td4 = $("<td>").text(product.amount);
        let td5 = $("<td>").text(product.customerName);
        let td6 = $("<td>").text(product.transactionDate);
        tr.append(td1, td2, td3, td4, td5, td6);
        productData.status.forEach(function (status) {
          if (status.id === product.status) {
            let td7 = $("<td>").text(status.name);
            tr.append(td7);
          }
        });

        let td8 = $(`<td>
                        <button class="btn btn-info" id="viewBtn">View</button>
                         <button class="btn btn-warning" onclick="">Edit</button>
                        `);
        tr.append(td8);
        $("#table").append(tr);
      });
    }
    getAllData();

    function createData(newData) {
      productData.data.push(newData);
      $("#createFormModal").modal("hide");
      getAllData();
      $("#form")[0].reset();
    }
    $("#form").submit(function (event) {
      event.preventDefault();
      let newData = {};
      newData.id = 1384;
      newData.productID = $("#productID").val();
      newData.productName = $("#productName").val();
      newData.amount = $("#amount").val();
      newData.customerName = $("#customerName").val();
      newData.status = 0;
      newData.transactionDate = new Date().toJSON();
      newData.createBy = "xyz";
      newData.createOn = new Date().toJSON();

      createData(newData);
    });

    function getDataById(id) {
      productData.data.forEach(function (product) {
        if (product.id === id) {
          console.log("Selected data: ", product);
          alert("Selected data: " + JSON.stringify(product));
        }
      });
    }
    $("#viewBtn").click(function () {
      let data = products.data
      let id = $(this).closest("tr").find("td:first").text();

      let selectedData = data.find((product) => product.id == id);
      console.log("Selected data: ", selectedData);
      alert("Selected data: " + JSON.stringify(selectedData));
    });

    function editData(id) {
      productData.data.forEach(function (product) {
        if (product.id === id) {
          // fill the form fields with the selected data
          $("#productID").val(product.productID);
          $("#productName").val(product.productName);
          $("#amount").val(product.amount);
          $("#customerName").val(product.customerName);
          $("#status").val(product.status);
          $("#transactionDate").val(product.transactionDate);
          $("#createBy").val(product.createBy);

          alert("Data has been successfully updated!");
          window.location.href = "index.html";
        }
      });
    }
  });
});
