const STORAGE_KEY = "profiles";
const LOGGED_IN_USER_KEY = "loggedInUser";

function readProfiles() {
  try {
    const storedProfiles = localStorage.getItem(STORAGE_KEY);
    if (!storedProfiles) {
      return [];
    }

    const profiles = JSON.parse(storedProfiles);
    return Array.isArray(profiles) ? profiles : [];
  } catch (error) {
    console.error("Could not read saved profiles:", error);
    return [];
  }
}

function saveProfiles(profiles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return true;
  } catch (error) {
    console.error("Could not save profile:", error);
    alert(
      "Your browser blocked local storage. Please enable site storage or use a normal browser window and try again.",
    );
    return false;
  }
}

function getValue(id) {
  const field = document.getElementById(id);
  return field ? field.value.trim() : "";
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = getValue("name");
    const email = getValue("email").toLowerCase();
    const college = getValue("college");
    const course = getValue("course");
    const skills = getValue("skills");
    const passwordField = document.getElementById("password");
    const password = passwordField ? passwordField.value : "";

    if (!name || !email || !college || !course || !skills || !password) {
      alert("Please complete every field before creating your profile.");
      return;
    }

    if (password.length < 6) {
      alert("Your password must be at least 6 characters long.");
      return;
    }

    const profiles = readProfiles();
    const existingUser = profiles.find(
      (profile) => String(profile.email).toLowerCase() === email,
    );

    if (existingUser) {
      alert("An account with this email already exists. Please log in.");
      window.location.href = "login.html";
      return;
    }

    const newProfile = {
      id: Date.now(),
      name,
      email,
      college,
      course,
      skills,
      password,
    };

    profiles.push(newProfile);

    if (!saveProfiles(profiles)) {
      return;
    }

    alert("Your profile has been created successfully! Please log in.");
    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = getValue("loginEmail").toLowerCase();
    const passwordField = document.getElementById("loginPassword");
    const password = passwordField ? passwordField.value : "";
    const profiles = readProfiles();
    const user = profiles.find(
      (profile) =>
        String(profile.email).toLowerCase() === email &&
        profile.password === password,
    );

    if (!user) {
      alert("Invalid email or password. Please register first or try again.");
      return;
    }

    try {
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Could not save login session:", error);
      alert(
        "Login could not be saved in this browser. Please enable site storage and try again.",
      );
      return;
    }

    alert("Login successful!");
    window.location.href = "profiles.html";
  });
}
