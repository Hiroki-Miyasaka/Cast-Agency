let form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = {
        email: email,
        password: password
    }

    console.log(data);
    axios.post("http://localhost:3001/api/auth/login", data)
    .then(data => {
        const { token } = data.data;
        // we need to save the token to localstorage
        localStorage.setItem("token", token);
        // we will redirect to the home page
        window.location.href = "./index.html";
    }).catch(err => {
        console.log(err);
    })
})