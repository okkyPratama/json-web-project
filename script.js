$(document).ready(function () {
  
    $.getJSON("viewData.json", 
            function (products) {

                products.data.forEach(function(product) {
                    let tr = $("<tr>");
                    let td1 = $("<td>").text(product.id);
                    let td2 = $("<td>").text(product.productID);
                    let td3 = $("<td>").text(product.productName);
                    let td4 = $("<td>").text(product.amount);
                    let td5 = $("<td>").text(product.customerName);
                    let td6 = $("<td>").text(product.transactionDate);
                

                    tr.append(td1, td2, td3, td4, td5, td6);
                    products.status.forEach(function(status) {
                        if (status.id === product.status) {
                            let td7 = $("<td>").text(status.name);
                            tr.append(td7);
                        }
                    });
                    // let td8 = $(`<td><button class="btn btn-info" onclick="${viewData(product.id)}">View</button>`)
                    // tr.append(td8)
                    $("#table").append(tr);
                });

                function createData(newData) {
                   
                    products.data.push(newData);
                }

                
                $("#form").submit(function(event) {
                    event.preventDefault(); 
                    let newData = {};
                    newData.id = 1384;
                    newData.productID = $("#productID").val();
                    newData.productName = $("#productName").val();
                    newData.amount = $("#amount").val();
                    newData.customerName = $("#customerName").val();
                    newData.status = 1;
                    newData.transactionDate = new Date().toJSON();
                    newData.createBy = "xyz";
                    newData.createOn = new Date().toJSON();
                    
                    createData(newData); 
                    if (newData != null) {
                        alert("Data has been successfully created!"); 
                        window.location.href = "index.html"; 
                    }
                });
                
                function viewData(id) {
                    products.data.forEach(function(product) {
                        if (product.id === id) {
                            // display the selected data
                            console.log("Selected data: ", product);
                            alert("Selected data: " + JSON.stringify(product));
    
                            
                        }
                    });
                }
            });

});



