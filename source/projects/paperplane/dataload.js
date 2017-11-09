/*
 * @Author: Shen Huang
 * @Date:   2017-11-01 21:16:22
 * @Last Modified time: 2017-11-08 15:38:29
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD1tRltlcodylyobdqXEDUheGcR-lDrDoA",
    authDomain: "front-end-project2.firebaseapp.com",
    databaseURL: "https://front-end-project2.firebaseio.com",
    projectId: "front-end-project2",
    storageBucket: "front-end-project2.appspot.com",
    messagingSenderId: "1024569021595"
};
firebase.initializeApp(config);


var postRef = firebase.database().ref();
var num_planes = 0;
var planes_info = [];
var google_location = "";
postRef.on('value', function(snap) {
    planes_info = [];
    snap.forEach(function(userSnap) {
        num_planes++;
        console.log(userSnap.val());
        planes_info.push(userSnap.val());
    });
    checkPlanes();
});

function checkPlanes() {
    arr_length = [0, 0];
    planes_info.forEach(function(plane) {
        arr_length[plane.line] ++;
    });
}

// Get a random planes information
function getRandomPlane() {
    var node = document.getElementById("catchmessageBox");
    var _pos = Math.floor(Math.random() * planes_info.length + 0.00001);

    node.childNodes[1].childNodes[1].innerText = planes_info[_pos].location; //geted value;
    node.childNodes[3].innerText = planes_info[_pos].message; // get value

}

function setCatchMessageBoxDisplay(displaytype = "none") {
    document.getElementById("catchmessageBox").style.display = displaytype;
}

function setSendMessageBoxDisplay(displaytype = "none") {
    document.getElementById("sendmessageBox").style.display = displaytype;
}

// 
document.getElementById("sendMessage").addEventListener("click", function() {
    setCatchMessageBoxDisplay();
    setSendMessageBoxDisplay("");
});

// get one message to show
document.getElementById("catchMessage").addEventListener("click", function() {
    setSendMessageBoxDisplay();
    setCatchMessageBoxDisplay("");
    getRandomPlane();
});

// close catch meesagebox
document.getElementById("closeCatchMessageBox").addEventListener("click", function() {
    setCatchMessageBoxDisplay();
});

// close send message box
document.getElementById("closeSendMessageBox").addEventListener("click", function() {
    setSendMessageBoxDisplay();
});

document.getElementById("submitSendMessageBox").addEventListener("click", function() {
    // setSendMessageBoxDisplay();
    document.getElementById("sendmessageBox")
    var location = document.getElementById("locationText").value;
    var message = document.getElementById("messageText").value;
    if (location === "") {
        location = "Mons Huygens, Moon";
    } else {
        location = google_location;
    }
    if (message === "") {
        message = "Moooooooon";
    }
    setSendMessageBoxDisplay();
    pushData(location, message);
    document.getElementById("locationText").value = "";
    document.getElementById("messageText").value = "";
    google_location = "";
});

function pushData(location, message) {
    

    var which_line;
    if (Math.random() > 0.5) {
        which_line = 1;
    } else {
        which_line = 0;
    }
    var max_id = -1;
    planes_info.forEach(function(plane) {
        if (plane.line === which_line) {
            max_id = Math.max(max_id, plane.id)
        }
        // console.log(plane);
    });

    var newPostRef = firebase.database().ref().push();
    newPostRef.set({    
        id: max_id + 1,
        line: which_line,
        location: location,
        message: message,
    });

}


// Load map data
function initMap(argument) {
    //result will be a parsed JavaScript object

    var input = /** @type {!HTMLInputElement} */ (
        document.getElementById('locationText'));

    var autocomplete = new google.maps.places.Autocomplete(locationText);
    var infowindow = new google.maps.InfoWindow();

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }


        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
            var data_city, data_country;
            place.address_components.forEach(function(element) {
                if (element.types[0] === "locality" && element.types[1] === "political") {
                    data_city = element.short_name;                    
                } 
                if (element.types[0] === "country" && element.types[1] === "political") {
                    data_country = element.short_name;                   
                } 
            });
            // console.log(data_city, data_country);
            google_location = data_city + ", " + data_country;
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    });
}