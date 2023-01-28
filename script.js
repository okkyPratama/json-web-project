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
                         <button class="btn btn-warning" id="editBtn">Edit</button>
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
        let data = products.data
        let selectedData = data.find((product) => product.id == id);
         
        $("#viewDetailFormModalLabel").html(`View Data: ID ${id}`)
        $("#viewproductID").val(selectedData.productID)
        $("#viewproductName").val(selectedData.productName)
        $("#viewamount").val(selectedData.amount)
        $("#viewcustomerName").val(selectedData.customerName)
        $("#viewstatus").val(selectedData.status ? "FAILED" : 'SUCCESS')
        $("#viewtransactionDate").val(selectedData.transactionDate)
        $("#viewcreateBy").val(selectedData.createBy)
        $("#viewcreateOn").val(selectedData.createOn)

        $("#viewDetailModal").modal("show");


    }

    $("#table").on("click", "#viewBtn", function () {
      let id = $(this).closest("tr").find("td:first").text();
      getDataById(id);
  });

    function editData(id) {
      let data = products.data
      let selectedData = data.find((product) => product.id == id);
      
      $("#editDataModal").modal("show");

      $("#editDataFormModalLabel").html(`Edit Data: ID ${id}`)
      $("#editproductID").val(selectedData.productID)
      $("#editproductName").val(selectedData.productName)
      $("#editamount").val(selectedData.amount)
      $("#editcustomerName").val(selectedData.customerName)
     
      $("#editDataform").submit(function(event){
        event.preventDefault()
        let updatedData = {
          productID: $("#editproductID").val(),
          productName: $("#editproductName").val(),
          amount: $("#editamount").val(),
          customerName: $("#editcustomerName").val()
        }
  
        let selectedIndex = productData.data.findIndex(
           (product) => product.id == selectedData.id
        )
  
        productData.data[selectedIndex] = { ...productData.data[selectedIndex], ...updatedData}
    
        $.ajax({
          type: "PUT",
          url: "viewData.json",
          data: JSON.stringify(selectedData),
          success: function(){
              console.log("Data updated successfully!");
          }
      });
  
      console.log("form has been submitted")
        $("#editDataModal").modal("hide");
        getAllData();
      })

    }

    
    $("#table").on("click", "#editBtn", function () {
      let id = $(this).closest("tr").find("td:first").text();
      editData(id);
  });
  });
});
