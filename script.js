var photoURL = "";

// Show photo preview in the form
document.getElementById("photo").addEventListener("change", function () {
    var file = this.files[0];
    if (file) {
        photoURL = URL.createObjectURL(file);
        var preview = document.getElementById("preview");
        preview.src = photoURL;
        preview.style.display = "block";
        document.getElementById("placeholder").style.display = "none";
    }
});

// Reset the photo preview
document.getElementById("resetBtn").addEventListener("click", function () {
    photoURL = "";
    document.getElementById("preview").style.display = "none";
    document.getElementById("placeholder").style.display = "flex";
});

function val(id) {
    return document.getElementById(id).value.trim();
}

function fillList(listId, items, tag) {
    var list = document.getElementById(listId);
    list.innerHTML = "";
    items.forEach(function (text) {
        if (text.trim() !== "") {
            var li = document.createElement("li");
            li.textContent = text.trim();
            list.appendChild(li);
        }
    });
}

function setLink(id, url, text) {
    var a = document.getElementById(id);
    a.href = url || "#";
    a.textContent = text || "Not given";
}

// Create profile when the form is submitted
document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Profile
    document.getElementById("outName").textContent = val("fullname");
    document.getElementById("outAbout").textContent = val("about");
    document.getElementById("tName").textContent = val("fullname");
    document.getElementById("tAddress").textContent = val("address") || "Not given";

    var dob = new Date(val("dob"));
    document.getElementById("tDob").textContent = dob.toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric"
    });

    var outPhoto = document.getElementById("outPhoto");
    if (photoURL) {
        outPhoto.src = photoURL;
        outPhoto.style.display = "block";
    } else {
        outPhoto.style.display = "none";
    }

    // Education table
    var body = document.getElementById("eduBody");
    body.innerHTML = "";
    var levels = [
        ["B.E. / Degree", "deg"],
        ["PUC / 12th", "puc"],
        ["SSLC / 10th", "sslc"]
    ];
    levels.forEach(function (item) {
        var inst = val(item[1] + "_inst");
        if (inst !== "") {
            var row = body.insertRow();
            row.insertCell().textContent = item[0];
            row.insertCell().textContent = inst;
            row.insertCell().textContent = val(item[1] + "_year");
            row.insertCell().textContent = val(item[1] + "_score");
        }
    });

    // Skills, projects, hobbies
    fillList("outSkills", val("skills").split(","));
    fillList("outProjects", document.getElementById("projects").value.split("\n"));
    fillList("outHobbies", val("hobbies").split(","));

    // Contact
    setLink("outEmail", "mailto:" + val("email"), val("email"));
    document.getElementById("outPhone").textContent = val("phone");
    setLink("outLinkedin", val("linkedin"), val("linkedin"));
    setLink("outGithub", val("github"), val("github"));

    // Switch from form to profile
    document.getElementById("formSection").style.display = "none";
    document.getElementById("profileView").style.display = "block";
    window.scrollTo(0, 0);
});

// Edit button goes back to the form (values stay)
document.getElementById("editBtn").addEventListener("click", function () {
    document.getElementById("profileView").style.display = "none";
    document.getElementById("formSection").style.display = "block";
    window.scrollTo(0, 0);
});

// Print button
// Submit button
document.getElementById("submitBtn").addEventListener("click", function () {
    document.getElementById("submitMsg").textContent = "Profile submitted successfully!";
    this.disabled = true;
    document.getElementById("editBtn").style.display = "none";
});

document.getElementById("year").textContent = new Date().getFullYear();
// ----- 3 PAGE FORM -----
var currentStep = 0;
var steps = document.querySelectorAll(".step");
var dots = document.querySelectorAll(".dot");

function showStep(n) {
    steps.forEach(function (s, i) {
        s.classList.toggle("active", i === n);
    });
    dots.forEach(function (d, i) {
        d.classList.toggle("active", i <= n);
    });
    currentStep = n;
    window.scrollTo(0, 0);
}

document.querySelectorAll(".nextBtn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        var inputs = steps[currentStep].querySelectorAll("input, textarea");
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].reportValidity()) {
                return; // stop if a required field is empty
            }
        }
        showStep(currentStep + 1);
    });
});

document.querySelectorAll(".backBtn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        showStep(currentStep - 1);
    });
});

document.getElementById("resetBtn").addEventListener("click", function () {
    showStep(0);
});