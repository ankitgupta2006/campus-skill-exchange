const LOGGED_IN_USER_KEY = "loggedInUser";

function getLoggedInUser() {
  try {
    const storedUser = localStorage.getItem(LOGGED_IN_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Could not read the login session:", error);
    return null;
  }
}

function getPagePath(fileName) {
  return window.location.pathname.includes("/pages/")
    ? fileName
    : `pages/${fileName}`;
}

function addSessionNavigation() {
  const navigation = document.querySelector("header nav");
  if (!navigation) return;

  const loggedInUser = getLoggedInUser();
  const loginLink = navigation.querySelector('a[href$="login.html"]');
  const registerLink = navigation.querySelector('a[href$="register.html"]');
  const existingDashboardLink = navigation.querySelector(
    'a[href$="dashboard.html"]',
  );
  let logoutButton = document.getElementById("logoutButton");

  if (loggedInUser) {
    if (loginLink) loginLink.hidden = true;
    if (registerLink) registerLink.hidden = true;

    if (!existingDashboardLink) {
      const dashboardLink = document.createElement("a");
      dashboardLink.href = getPagePath("dashboard.html");
      dashboardLink.textContent = "Dashboard";
      navigation.prepend(dashboardLink);
    }

    if (!logoutButton) {
      logoutButton = document.createElement("button");
      logoutButton.id = "logoutButton";
      logoutButton.className = "nav-button session-logout";
      logoutButton.type = "button";
      logoutButton.textContent = "Log out";
      navigation.appendChild(logoutButton);
    }

    logoutButton.addEventListener("click", () => {
      localStorage.removeItem(LOGGED_IN_USER_KEY);
      window.location.href = getPagePath("login.html");
    });
  } else if (logoutButton) {
    logoutButton.hidden = true;
  }
}

document.addEventListener("DOMContentLoaded", addSessionNavigation);
