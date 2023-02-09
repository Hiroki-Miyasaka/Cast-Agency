let name = document.getElementById('name');
let agencyLink = document.getElementById("cast-link");
let agencyName = document.getElementById("cast-name");
let agencyBio = document.getElementById("cast-bio");
let agencyLocation = document.getElementById("cast-location");
let logoutButton = document.getElementById("logout");
let userRole = document.getElementById("user-role");
let token = localStorage.getItem("token");

// user update selectors
let userUpdateButton = document.getElementById("user-update-button");
let userUpdateName = document.getElementById("user-name");
let roleButtonGroup = document.querySelectorAll("input[name='btnradio']");
let role = ""

// agency selectors
let agencyInputName = document.getElementById("agency-name");
let agencyInputLocation = document.getElementById("agency-location");
let agencyInputPhone = document.getElementById("agency-phone");
let agencyInputWebsite = document.getElementById("agency-website");
let agencyInputEmail = document.getElementById("agency-email");
let agencyInputBio = document.getElementById("agency-bio");
let agencyInputLogo = document.getElementById("agency-logo");
let agencyInputSince = document.getElementById("agency-since");
let agencyCreateButton = document.getElementById("agency-create-button");

// add actor selectors


if(token){
    axios.defaults.headers.common["Authorization"] = `${token}`;
}

getMe();

function getMe(){
    axios.get("http://localhost:3001/me").then(
        data => {
            const { fullName, role, agencies } = data.data.user;

            name.innerText = fullName;
            userRole.innerHTML = role;

            console.log(agencies);
            agencies.forEach((item) => {
                document.getElementById("agencies").innerHTML += 
                `
                <div class="col-md-6">
                    <div class="h-100 p-5 text-bg-dark rounded-3">
                        <h2 id="agency-name">${item.name}</h2>
                        <p id="agency-bio">${item.bio}</p>
                        <p id="location">${item.location}</p>
                    </div>
                </div>
                `;
            });

            if(role === "AGENCY"){
                agencyLink.style.display = "block";
            }else{
                agencyLink.style.display = "none";
            }
        }
    )
}

function userUpdate(fullName, role){
    let data = {};

    if(fullName !== ""){
        data.fullName = fullName;
    }
    if(role !== ""){
        data.role = role;
    }

    axios.put("http://localhost:3001/update", data)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

}

function createAgency(){
    // 123-123-1234
    let phoneNumber = agencyInputPhone.value.replace(/-/g, "");

    if(agencyInputName.value === "" ||
        agencyInputLocation.value === "" || 
        phoneNumber === "" || 
        agencyInputWebsite.value === "" || 
        agencyInputEmail.value === "" ||
        agencyInputBio.value === "" ||
        agencyInputLogo.value === "" ||
        agencyInputSince.value === "")
    {
        alert("Please fill all inputs");
        return;
    }

    let data = {
        name: agencyInputName.value,
        location: agencyInputLocation.value,
        phoneNumber: phoneNumber,
        website: agencyInputWebsite.value,
        email: agencyInputEmail.value,
        bio: agencyInputBio.value,
        logo: agencyInputLogo.value,
        since: agencyInputSince.value
    };

    axios.post("http://localhost:3001/api/agency/", data)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    
}

function createActor() {
    // TODO: create actor
    // please put your logic and call api here
    
}

roleButtonGroup.forEach((item ) => {
    item.addEventListener("click", () => {
        role = item.value;
    })
})

logoutButton.addEventListener("click", () => {
    // we will call logout endpoint
    // then we will delete token from localstorage
    // then we will redirect to login page
    axios.post("http://localhost:3001/api/auth/logout").then(
        data => {
            localStorage.removeItem("token");
            window.location.href = "./login.html";
        }
    ).catch((err) => {
        console.log(err);
    });
})

userUpdateButton.addEventListener("click", () => {
    userUpdate(userUpdateName.value, role);
    window.location.reload();
})

agencyCreateButton.addEventListener("click", () => {
    createAgency();
    getMe();
    window.location.reload();
})

// TODO: create actor
// you will add event listener for create actor button
// and call createActor function
