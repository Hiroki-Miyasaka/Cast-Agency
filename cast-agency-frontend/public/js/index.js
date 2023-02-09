let userInformation = document.getElementById("username");
let logoutButton = document.getElementById("logout");
let agencyLink = document.getElementById("agency-link");
let listActor = document.getElementById("list-actor");

let token = localStorage.getItem("token");

if(token){
    axios.defaults.headers.common["Authorization"] = `${token}`;
}

getMe();
getActors();

function getMe(){
    axios.get("http://localhost:3001/me").then(
        data => {
            const { fullName, role } = data.data.user;

            userInformation.innerText = "Hello " + fullName;
            if(role === "AGENCY"){
                agencyLink.style.display = "block";
            }else{
                agencyLink.style.display = "none";
            }
            
        }
    )
}

function getActors(){
    axios.get("http://localhost:3001/api/actors/").then(
        data => {
            const { actors } = data.data;

            actors.forEach(actor => {
                const { height, weight, eyes } = actor.physical_information;
                const { facebook, linkedIn } = actor.social;

                listActor.innerHTML += 
                `
                <div class="card" style="width: 18rem;">
                    <img src=${actor.avatar ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"} height="320" class="card-img-top" alt=${actor.fullName + " avatar"}>
                    <div class="card-body">
                        <h5 class="card-title">${actor.fullName}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Facebook: ${facebook}</li>
                        <li class="list-group-item">LinkedIn: ${linkedIn}</li>
                        <li class="list-group-item">Eye color: ${eyes}</li>
                    </ul>
                </div>
                `;
            })

            console.log(actors);
        }
    )
}

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