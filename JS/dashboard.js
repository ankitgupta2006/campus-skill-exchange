const STORAGE_KEY = "profiles";
const LOGGED_IN_USER_KEY = "loggedInUser";
const REQUESTS_KEY = "exchangeRequests";

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(LOGGED_IN_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Could not read the logged-in user:", error);
    return null;
  }
}

function getStoredProfiles() {
  try {
    const storedProfiles = localStorage.getItem(STORAGE_KEY);
    const profiles = storedProfiles ? JSON.parse(storedProfiles) : [];
    return Array.isArray(profiles) ? profiles : [];
  } catch (error) {
    console.error("Could not read profiles:", error);
    return [];
  }
}

function getExchangeRequests(userId) {
  try {
    const storedRequests = localStorage.getItem(REQUESTS_KEY);
    const requests = storedRequests ? JSON.parse(storedRequests) : [];
    return Array.isArray(requests)
      ? requests.filter(
          (request) =>
            request.toUserId === userId && request.status === "pending",
        )
      : [];
  } catch (error) {
    console.error("Could not read exchange requests:", error);
    return [];
  }
}

function getInitials(name) {
  const words = String(name || "Student")
    .trim()
    .split(/\s+/);
  if (words.length > 1) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return words[0].slice(0, 2).toUpperCase();
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value || "Not available";
  }
}

function renderSkills(skills) {
  const list = document.getElementById("skillsList");
  if (!list) return;

  list.innerHTML = "";
  String(skills || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)
    .forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.textContent = skill;
      list.appendChild(tag);
    });
}

function renderExchangeRequests(user) {
  const requestList = document.getElementById("requestList");
  const requestCount = document.getElementById("requestCount");
  const notificationSummary = document.getElementById("notificationSummary");
  if (!requestList || !requestCount || !notificationSummary) return;

  const requests = getExchangeRequests(user.id);
  requestCount.textContent = requests.length;
  notificationSummary.textContent = requests.length
    ? `${requests.length} pending exchange request${requests.length === 1 ? "" : "s"}.`
    : "No new exchange requests.";
  requestList.innerHTML = "";

  if (!requests.length) {
    requestList.innerHTML =
      '<p class="empty-requests">When another student sends you an exchange request, it will appear here.</p>';
    return;
  }

  requests.forEach((request) => {
    const item = document.createElement("article");
    item.className = "request-item";
    item.innerHTML = `
      <div>
        <strong>${request.fromName}</strong>
        <p>${request.message || "Would like to exchange skills with you."}</p>
      </div>
      <div class="request-actions">
        <button class="accept-request" type="button" data-request-id="${request.id}">Accept</button>
        <button class="decline-request" type="button" data-request-id="${request.id}">Decline</button>
      </div>`;
    requestList.appendChild(item);
  });
}

function updateRequestStatus(requestId, status, user) {
  try {
    const storedRequests = localStorage.getItem(REQUESTS_KEY);
    const requests = storedRequests ? JSON.parse(storedRequests) : [];
    const updatedRequests = Array.isArray(requests)
      ? requests.map((request) =>
          request.id === requestId ? { ...request, status } : request,
        )
      : [];
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updatedRequests));
    renderExchangeRequests(user);
  } catch (error) {
    console.error("Could not update exchange request:", error);
    alert("The exchange request could not be updated. Please try again.");
  }
}

function renderDashboard(user) {
  setText("studentName", user.name);
  setText("profileName", user.name);
  setText("profileEmail", user.email);
  setText("profileCollege", user.college);
  setText("profileCourse", user.course);

  const avatar = document.getElementById("studentAvatar");
  if (avatar) {
    avatar.textContent = getInitials(user.name);
  }

  const skills = String(user.skills || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
  setText("skillsCount", skills.length);
  renderSkills(user.skills);
  renderExchangeRequests(user);
}

function showEditForm(user) {
  const section = document.getElementById("editProfileSection");
  if (!section) return;

  document.getElementById("editName").value = user.name || "";
  document.getElementById("editCollege").value = user.college || "";
  document.getElementById("editCourse").value = user.course || "";
  document.getElementById("editSkills").value = user.skills || "";
  section.hidden = false;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideEditForm() {
  const section = document.getElementById("editProfileSection");
  if (section) {
    section.hidden = true;
  }
}

const currentUser = getStoredUser();

if (!currentUser) {
  window.location.href = "login.html";
} else {
  renderDashboard(currentUser);

  document.getElementById("editProfileButton").addEventListener("click", () => {
    showEditForm(currentUser);
  });

  document
    .getElementById("cancelEditButton")
    .addEventListener("click", hideEditForm);

  document
    .getElementById("editProfileForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const updatedUser = {
        ...currentUser,
        name: document.getElementById("editName").value.trim(),
        college: document.getElementById("editCollege").value.trim(),
        course: document.getElementById("editCourse").value.trim(),
        skills: document.getElementById("editSkills").value.trim(),
      };

      const profiles = getStoredProfiles().map((profile) =>
        profile.id === currentUser.id ? updatedUser : profile,
      );

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(updatedUser));
        Object.assign(currentUser, updatedUser);
        renderDashboard(currentUser);
        hideEditForm();
        alert("Your profile has been updated.");
      } catch (error) {
        console.error("Could not update profile:", error);
        alert(
          "Your profile could not be updated. Please enable browser storage and try again.",
        );
      }
    });

  document.getElementById("requestList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-request-id]");
    if (!button) return;

    const status = button.classList.contains("accept-request")
      ? "accepted"
      : "declined";
    updateRequestStatus(Number(button.dataset.requestId), status, currentUser);
  });

  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    window.location.href = "login.html";
  });
}
