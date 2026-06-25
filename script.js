function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=login";
    url += "&username=" + encodeURIComponent(username);
    url += "&password=" + encodeURIComponent(password);

    fetch(url)
    .then(response => response.text())
    .then(data => {

        if(data == "Success") {

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("message").innerHTML =
            "Invalid Username or Password";
        }
    });
}
function logout() {
    window.location.href = "login.html";
}
function saveEntry() {

    let customerName =
        document.getElementById("customerName").value;

    let accountNo =
        document.getElementById("accountNo").value;

    let accountType =
        document.getElementById("accountType").value;

    let mobileNo =
        document.getElementById("mobileNo").value;

    let noOfPassbooks =
        document.getElementById("noOfPassbooks").value;

    let remarks =
        document.getElementById("remarks").value;

    let url = "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=addEntry";
    url += "&customerName=" + encodeURIComponent(customerName);
    url += "&accountNo=" + encodeURIComponent(accountNo);
    url += "&accountType=" + encodeURIComponent(accountType);
    url += "&mobileNo=" + encodeURIComponent(mobileNo);
    url += "&noOfPassbooks=" + encodeURIComponent(noOfPassbooks);
    url += "&remarks=" + encodeURIComponent(remarks);

    fetch(url)
      .then(response => response.text())
      .then(data => {
    alert("Entry Saved Successfully!");

    localStorage.setItem("tokenNo", data);
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("accountNo", accountNo);
    window.open("receipt.html", "_blank");
    
    document.getElementById("customerName").value = "";
    document.getElementById("accountNo").value = "";
    document.getElementById("accountType").selectedIndex = 0;
    document.getElementById("mobileNo").value = "";
    document.getElementById("noOfPassbooks").value = "";
    document.getElementById("remarks").value = "";

    document.getElementById("customerName").focus();
})
      .catch(error => {
          alert("Error saving entry");
          console.log(error);
      });
}
function searchEntry() {

    let searchValue =
        document.getElementById("searchValue").value;

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=searchEntry";
    url += "&searchValue=" + encodeURIComponent(searchValue);

    fetch(url)
    .then(response => response.text())
    .then(data => {

        if(data === "Not Found"){

            document.getElementById("result").innerHTML =
            "<h3>No Record Found</h3>";

        } else {

            let result = JSON.parse(data);

            document.getElementById("result").innerHTML = `
                <h3>Customer Details</h3>

                <p><b>Token No:</b> ${result.tokenNo}</p>
                <p><b>Name:</b> ${result.customerName}</p>
                <p><b>Account No:</b> ${result.accountNo}</p>
                <p><b>Account Type:</b> ${result.accountType}</p>
                <p><b>Passbooks:</b> ${result.noOfPassbooks}</p>
               <p><b>Status:</b> ${result.status}</p>
               <br>

<button onclick='editEntry(
"${result.tokenNo}",
"${result.customerName}",
"${result.accountNo}",
"${result.accountType}",
"${result.mobileNo}",
"${result.noOfPassbooks}",
"${result.remarks}"
)'>
✏️ Edit Entry
</button>

<br><br>

<button onclick='deleteEntry("${result.tokenNo}")'>
🗑️ Delete Entry
</button>

<select id="newStatus">
    <option value="Received">Received</option>
    <option value="Under Processing">Under Processing</option>
    <option value="Ready for Delivery">Ready for Delivery</option>
    <option value="Delivered">Delivered</option>
</select>

<br><br>

<button onclick="updateStatus('${result.tokenNo}')">
    Update Status
</button>
            `;
        }
    });
}
function updateStatus(tokenNo){

    let newStatus =
        document.getElementById("newStatus").value;

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=updateStatus";
    url += "&tokenNo=" + tokenNo;
    url += "&newStatus=" + encodeURIComponent(newStatus);

    fetch(url)
    .then(response => response.text())
    .then(data => {
        alert(data);
    });
}
function loadDashboardStats() {

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=getStats";

    fetch(url)
    .then(response => response.json())
    .then(data => {

        document.getElementById("total").innerText =
        data.total;

        document.getElementById("pending").innerText =
        data.pending;

        document.getElementById("ready").innerText =
        data.ready;

        document.getElementById("delivered").innerText =
        data.delivered;
    });
}
function trackPassbook(){

    let value =
        document.getElementById("customerSearch").value;

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=searchEntry";
    url += "&searchValue=" + encodeURIComponent(value);

    fetch(url)
    .then(response => response.text())
    .then(data => {

        if(data == "Not Found"){

            document.getElementById("customerResult").innerHTML =
            "<h3>No Record Found</h3>";

        } else {

            let result = JSON.parse(data);

            document.getElementById("customerResult").innerHTML = `
                <h3>Status Details</h3>

                <p><b>Name:</b> ${result.customerName}</p>

                <p><b>Account No:</b>
                ${result.accountNo}</p>

                <p><b>Status:</b>
                ${result.status}</p>
            `;
        }
    });
}
function loadPendingPassbooks() {

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=getPending";

    fetch(url)
    .then(response => response.json())
    .then(data => {

        let html = "";

        data.forEach(item => {

            html += `
            <div style="border:1px solid #ccc;
                        margin:10px;
                        padding:10px;
                        border-radius:5px;">

                <p><b>Token:</b> ${item.tokenNo}</p>
                <p><b>Name:</b> ${item.customerName}</p>
                <p><b>Account:</b> ${item.accountNo}</p>
                <p><b>Type:</b> ${item.accountType}</p>
                <p><b>Status:</b> ${item.status}</p>

            </div>`;
        });

        document.getElementById("pendingList").innerHTML = html;
    });
}
function loadReadyPassbooks() {

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=getReady";

    fetch(url)
    .then(response => response.json())
    .then(data => {

        let html = "";

        data.forEach(item => {

            html += `
            <div style="border:1px solid #ccc;
                        margin:10px;
                        padding:10px;
                        border-radius:5px;">

                <p><b>Token:</b> ${item.tokenNo}</p>
                <p><b>Name:</b> ${item.customerName}</p>
                <p><b>Account:</b> ${item.accountNo}</p>
                <p><b>Type:</b> ${item.accountType}</p>
                <p><b>Status:</b> ${item.status}</p>

            </div>`;
        });

        document.getElementById("readyList").innerHTML = html;
    });
}
function loadReports() {

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=getStats";

    fetch(url)
    .then(response => response.json())
    .then(data => {

        document.getElementById("reportData").innerHTML = `

            <p><b>Total Passbooks:</b>
            ${data.total}</p>

            <p><b>Pending:</b>
            ${data.pending}</p>

            <p><b>Ready for Delivery:</b>
            ${data.ready}</p>

            <p><b>Delivered:</b>
            ${data.delivered}</p>

        `;
    });
}
function editEntry(
tokenNo,
customerName,
accountNo,
accountType,
mobileNo,
noOfPassbooks,
remarks
){

    localStorage.setItem("editTokenNo", tokenNo);
    localStorage.setItem("editCustomerName", customerName);
    localStorage.setItem("editAccountNo", accountNo);
    localStorage.setItem("editAccountType", accountType);
    localStorage.setItem("editMobileNo", mobileNo);
    localStorage.setItem("editNoOfPassbooks", noOfPassbooks);
    localStorage.setItem("editRemarks", remarks);

    window.location.href = "edit.html";
}
function updateEntry() {

    let tokenNo =
        localStorage.getItem("editTokenNo");

    let customerName =
        document.getElementById("customerName").value;

    let accountNo =
        document.getElementById("accountNo").value;

    let accountType =
        document.getElementById("accountType").value;

    let mobileNo =
        document.getElementById("mobileNo").value;

    let noOfPassbooks =
        document.getElementById("noOfPassbooks").value;

    let remarks =
        document.getElementById("remarks").value;

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=updateEntry";
    url += "&tokenNo=" + encodeURIComponent(tokenNo);
    url += "&customerName=" + encodeURIComponent(customerName);
    url += "&accountNo=" + encodeURIComponent(accountNo);
    url += "&accountType=" + encodeURIComponent(accountType);
    url += "&mobileNo=" + encodeURIComponent(mobileNo);
    url += "&noOfPassbooks=" + encodeURIComponent(noOfPassbooks);
    url += "&remarks=" + encodeURIComponent(remarks);

    fetch(url)
    .then(response => response.text())
    .then(data => {

        alert(data);

        window.location.href = "search.html";
    });
}
function deleteEntry(tokenNo){

    let confirmDelete =
        confirm("Are you sure you want to delete this entry?");

    if(!confirmDelete){
        return;
    }

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=deleteEntry";
    url += "&tokenNo=" + encodeURIComponent(tokenNo);

    fetch(url)
    .then(response => response.text())
    .then(data => {

        alert(data);

        document.getElementById("result").innerHTML = "";

    });
}
function getDateReport() {

    let reportDate =
        document.getElementById("reportDate").value;

    let url =
    "https://script.google.com/macros/s/AKfycbyKuENO-P1aJdZYj4yep8re7dhQOuvz9mYl48oiB1xCC9Xtkl_Im8c63-LTJ5Whdwiz/exec";

    url += "?action=getDateReport";
    url += "&reportDate=" + reportDate;

    fetch(url)
    .then(response => response.json())
    .then(data => {

        let html = "";

        if(data.length == 0){

            html = "<h3>No Records Found</h3>";

        } else {

            html += `<h3>Total Entries: ${data.length}</h3>`;

            data.forEach(item => {

                html += `
                <div style="border:1px solid #ccc;
                            margin:10px;
                            padding:10px;">

                    <p><b>Token:</b> ${item.tokenNo}</p>
                    <p><b>Name:</b> ${item.customerName}</p>
                    <p><b>Account:</b> ${item.accountNo}</p>
                    <p><b>Status:</b> ${item.status}</p>

                </div>
                `;
            });
        }

        document.getElementById("dateReportResult").innerHTML = html;
    });
}
function printDateReport(){

    let printContent =
        document.getElementById("dateReportResult").innerHTML;

    let newWindow = window.open("", "", "width=800,height=600");

    newWindow.document.write(`
        <html>
        <head>
            <title>Passbook Report</title>
        </head>
        <body>

            <h2>Bogadi BO</h2>
            <h3>Passbook Date Report</h3>

            ${printContent}

        </body>
        </html>
    `);

    newWindow.document.close();

    newWindow.print();
}