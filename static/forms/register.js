const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const newPasswordInput = document.getElementById("new_password");
const passwordInput = document.getElementById("password");
const passwordInputMatch = document.getElementById("new_password_match");
const BASE_URL_USERNAMES = "http://127.0.0.1:5000/usernames/all";
const BASE_URL_EMAILS = "http://127.0.0.1:5000/emails/all";
const submitButton = document.getElementById("submitButton");
submitButton.disabled = false;

if (usernameInput) {
  const formGroups = Array.from(document.querySelectorAll(".form-group"));
  const usernameAvailability = document.createElement("div");
  usernameAvailability.setAttribute("id", "usernameAvailability");
  formGroups[0].append(usernameAvailability);
  usernameInput.addEventListener("input", async function () {
    resp = await axios.get(BASE_URL_USERNAMES, {
      params: { username: usernameInput.value },
    });

    usernameAvailability.innerText = resp.data;

    console.log(resp);
    if (usernameInput.nextSibling.nextSibling) {
      if (
        usernameInput.nextSibling.nextSibling.classList.contains("formError")
      ) {
        usernameInput.nextSibling.nextSibling.innerText = "";
      }
    }
  });
}

if (emailInput) {
  const emailAvailability = document.createElement("div");
  emailAvailability.setAttribute("id", "emailAvailability");
  const formGroups = Array.from(document.querySelectorAll(".form-group"));
  formGroups[1].append(emailAvailability);
  emailInput.addEventListener("input", async function () {
    resp = await axios.get(BASE_URL_EMAILS, {
      params: { email: emailInput.value },
    });
    emailAvailability.innerText = resp.data;

    console.log(resp);
    if (emailInput.nextSibling.nextSibling.classList.contains("formError")) {
      emailInput.nextSibling.nextSibling.innerText = "";
    }
  });
}

if (passwordInputMatch) {
  const passwordMatchCheck = document.createElement("div");
  passwordMatchCheck.setAttribute("id", "passwordMatch");
  const formGroups = Array.from(document.querySelectorAll(".form-group"));
  formGroups[3].append(passwordMatchCheck);
  passwordInput.addEventListener("input", function () {
    if (
      passwordInput.value == passwordInputMatch.value &&
      passwordInput.value != ""
    ) {
      passwordMatchCheck.innerText = "Passwords are a Match";
    } else {
      passwordMatchCheck.innerText = "Passwords do not match";
    }
    if (passwordInput.nextSibling.nextSibling) {
      // console.log(passwordInput.nextSibling.nextSibling);
      if (
        passwordInput.nextSibling.nextSibling.classList.contains("formError")
      ) {
        passwordInput.nextSibling.nextSibling.innerText = "";
      }
    }
  });
  passwordInputMatch.addEventListener("input", function () {
    if (
      passwordInput.value == passwordInputMatch.value &&
      passwordInput.value != ""
    ) {
      passwordMatchCheck.innerText = "Passwords are a Match";
    } else {
      passwordMatchCheck.innerText = "Passwords do not match";
    }

    if (passwordInputMatch.nextSibling.nextSibling) {
      if (
        passwordInputMatch.nextSibling.nextSibling.classList.contains(
          "formError"
        )
      ) {
        //   console.log(passwordInputMatch.nextSibling.nextSibling);
        passwordInputMatch.nextSibling.nextSibling.innerText = "";
      }
    }
  });
}

window.addEventListener("mousemove", function () {
  if (
    document.getElementById("usernameAvailability").innerText ==
      "Username is available" &&
    document.getElementById("emailAvailability").innerText ==
      "Email is available" &&
    passwordInput.value == passwordInputMatch.value &&
    passwordInput.value != ""
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
window.addEventListener("touchstart", function () {
  if (
    document.getElementById("usernameAvailability").innerText ==
      "Username is available" &&
    document.getElementById("emailAvailability").innerText ==
      "Email is available" &&
    passwordInput.value == passwordInputMatch.value &&
    passwordInput.value != ""
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
