const API = "https://job-portal-backend-aou8.onrender.com"; // replace if needed

let currentUser = null;

// Signup
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  alert("Signup successful!");
}

// Login
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    currentUser = username;
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("userDisplay").innerText = username;
    loadJobs();
  } else {
    alert("Invalid login");
  }
}

// Post Job
async function postJob() {
  const title = document.getElementById("jobTitle").value;
  const desc = document.getElementById("jobDesc").value;

  await fetch(`${API}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, desc })
  });

  loadJobs();
}

// Load Jobs
async function loadJobs() {
  const res = await fetch(`${API}/jobs`);
  const jobs = await res.json();

  const jobsDiv = document.getElementById("jobs");
  jobsDiv.innerHTML = "";

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job";

    div.innerHTML = `
      <h4>${job.title}</h4>
      <p>${job.desc}</p>
      <button onclick="applyJob('${job._id}')">Apply</button>
    `;

    jobsDiv.appendChild(div);
  });
}

// Apply Job
async function applyJob(id) {
  await fetch(`${API}/apply/${id}`, {
    method: "POST"
  });

  alert("Applied!");
}
