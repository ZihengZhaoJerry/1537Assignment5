console.log("Client script loaded.");

// AJAX GET function to fetch data
function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            callback(this.responseText);
        } else {
            console.log("Error: " + this.status);
        }
    };
    xhr.open("GET", url);
    xhr.send();
}

// Fetch and display weapons from Weapons.html
document.querySelector("#weaponsHTML").addEventListener("click", function () {
    ajaxGET("/weapons-html", function (data) {
        console.log("Received HTML Data:", data);
        document.getElementById("weapon-table").innerHTML = data;
    });
});

// Fetch and display weapons from weapons.js (JSON)
document.querySelector("#weaponsJSON").addEventListener("click", function () {
    ajaxGET("/weapons-json", function (data) {
        console.log("Before parsing JSON:", data);
        let parsedData = JSON.parse(data);
        console.log("After parsing JSON:", parsedData);

        let str = `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Damage</th>
                    <th>Weight</th>
                    <th>Scaling</th>
                </tr>`;

        parsedData.weapons.forEach(weapon => {
            str += `
                <tr>
                    <td>${weapon.name}</td>
                    <td>${weapon.type}</td>
                    <td>${weapon.damage}</td>
                    <td>${weapon.weight}</td>
                    <td>${weapon.scaling}</td>
                </tr>`;
        });

        str += "</table>";
        document.getElementById("weapon-data").innerHTML = str;
    });
});

// Clear button functionality
document.querySelectorAll(".clear").forEach(function (clearButton) {
    clearButton.addEventListener("click", function () {
        document.getElementById("weapon-table").innerHTML = "";
        document.getElementById("weapon-data").innerHTML = "";
    });
});
