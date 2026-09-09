const REQUESTS_KEY = "exchangeRequests";

const sampleProfiles = [
  {
    id: 1,
    name: "Ankit Gupta",
    email: "aanya@example.com",
    college: "Campus University",
    course: "B.Sc Computer Science",
    skills: "UX Research, Interaction Design",
    password: "",
  },
  {
    id: 2,
    name: "Harsh Srivastava",
    email: "sarah@example.com",
    college: "Campus University",
    course: "B.Des",
    skills: "UX Design, UI Design",
    password: "",
  },
  {
    id: 3,
    name: "Deepshikha Mall",
    email: "david@example.com",
    college: "Campus University",
    course: "B.A Media",
    skills: "Photography, Video Editing",
    password: "",
  },
  {
    id: 4,
    name: "Harshit Singh",
    email: "anya@example.com",
    college: "Campus University",
    course: "B.A Languages",
    skills: "Spanish, Communication",
    password: "",
  },
  {
    id: 5,
    name: "Vikki Kumar",
    email: "ankit@example.com",
    college: "Campus University",
    course: "B.Sc Mathematics",
    skills: "React Basics, Computer Application",
    password: "",
  },
];

function getProfiles() {
  try {
    const storedProfiles = localStorage.getItem("profiles");
    if (!storedProfiles) {
      return sampleProfiles;
    }

    const profiles = JSON.parse(storedProfiles);
    return Array.isArray(profiles)
      ? sampleProfiles.concat(profiles)
      : sampleProfiles;
  } catch (error) {
    console.error("Could not read profiles:", error);
    return sampleProfiles;
  }
}

function getLoggedInUser() {
  try {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Could not read the logged-in user:", error);
    return null;
  }
}

function getStoredRequests() {
  try {
    const storedRequests = localStorage.getItem(REQUESTS_KEY);
    const requests = storedRequests ? JSON.parse(storedRequests) : [];
    return Array.isArray(requests) ? requests : [];
  } catch (error) {
    console.error("Could not read exchange requests:", error);
    return [];
  }
}

function createAvatar(name) {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function hasPendingRequest(profileId, currentUserId) {
  return getStoredRequests().some(
    (request) =>
      request.fromUserId === currentUserId &&
      request.toUserId === profileId &&
      request.status === "pending",
  );
}

function sendExchangeRequest(profile) {
  const currentUser = getLoggedInUser();
  if (!currentUser) {
    alert("Please log in before sending an exchange request.");
    window.location.href = "login.html";
    return;
  }

  if (currentUser.id === profile.id) {
    alert("You cannot send an exchange request to yourself.");
    return;
  }

  const requests = getStoredRequests();
  const alreadyRequested = requests.some(
    (request) =>
      request.fromUserId === currentUser.id &&
      request.toUserId === profile.id &&
      request.status === "pending",
  );

  if (alreadyRequested) {
    alert("You already have a pending request for this student.");
    return;
  }

  const message = window.prompt(
    `Send an exchange request to ${profile.name}:`,
    `I would like to learn ${profile.skills.split(",")[0].trim()} from you.`,
  );
  if (message === null) return;

  requests.push({
    id: Date.now(),
    fromUserId: currentUser.id,
    fromName: currentUser.name,
    toUserId: profile.id,
    toName: profile.name,
    message: message.trim() || "Would like to exchange skills with you.",
    status: "pending",
  });

  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
    alert(`Your exchange request was sent to ${profile.name}.`);
    displayProfiles(getProfiles());
  } catch (error) {
    console.error("Could not save exchange request:", error);
    alert(
      "The request could not be sent. Please enable browser storage and try again.",
    );
  }
}

function displayProfiles(profileList) {
  const container = document.getElementById("profileContainer");
  if (!container) return;
  container.innerHTML = "";

  if (profileList.length === 0) {
    container.innerHTML =
      '<div class="no-profile"><h3>No students found</h3><p>Try searching for another name or skill.</p></div>';
    return;
  }

  const currentUser = getLoggedInUser();

  profileList.forEach((profile) => {
    const card = document.createElement("div");
    card.className = "profile-card";

    const avatar = createAvatar(profile.name);
    const skills = profile.skills
      .split(",")
      .map((skill) => `<span class="skill-tag">${skill.trim()}</span>`)
      .join("");

    card.innerHTML = `
      <div class="profile-top">
        <div class="profile-avatar">${avatar}</div>
        <div>
          <h3>${profile.name}</h3>
          <p class="profile-course">${profile.course}</p>
        </div>
      </div>
      <p><strong>College:</strong> ${profile.college}</p>
      <p><strong>Email:</strong> ${profile.email}</p>
      <div class="profile-skills">
        <strong>Skills to teach</strong>
        ${skills}
      </div>`;

    const action = document.createElement("div");
    action.className = "profile-action";

    const requestButton = document.createElement("button");
    requestButton.className = "request-button";
    requestButton.type = "button";
    requestButton.dataset.profileId = profile.id;

    if (currentUser && currentUser.id === profile.id) {
      requestButton.disabled = true;
      requestButton.textContent = "Your profile";
    } else if (currentUser && hasPendingRequest(profile.id, currentUser.id)) {
      requestButton.disabled = true;
      requestButton.textContent = "Request sent";
    } else {
      requestButton.textContent = "Send exchange request";
    }

    action.appendChild(requestButton);
    card.appendChild(action);
    container.appendChild(card);
  });
}

function searchProfiles() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const searchValue = searchInput.value.trim().toLowerCase();
  const filteredProfiles = getProfiles().filter((profile) =>
    [profile.name, profile.skills, profile.course, profile.college].some(
      (value) => value.toLowerCase().includes(searchValue),
    ),
  );
  displayProfiles(filteredProfiles);
}

document
  .getElementById("profileContainer")
  ?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-profile-id]");
    if (!button || button.disabled) return;

    const profile = getProfiles().find(
      (item) => String(item.id) === button.dataset.profileId,
    );
    if (profile) {
      sendExchangeRequest(profile);
    }
  });

displayProfiles(getProfiles());
