let users = JSON.parse(localStorage.getItem("users")) || [];
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let currentUser = null;

function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = username;
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("userDisplay").innerText = username;
    displayJobs(jobs);
  } else {
    alert("Invalid credentials");
  }
}

function postJob() {
  const title = document.getElementById("jobTitle").value;
  const desc = document.getElementById("jobDesc").value;

  const job = { title, desc, applicants: [] };
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  displayJobs(jobs);
}

function displayJobs(jobList) {
  const jobsDiv = document.getElementById("jobs");
  jobsDiv.innerHTML = "";

  jobList.forEach((job, index) => {
    const div = document.createElement("div");
    div.className = "job";

    div.innerHTML = `
      <h4>${job.title}</h4>
      <p>${job.desc}</p>
      <button onclick="applyJob(${index})">Apply</button>
    `;

    jobsDiv.appendChild(div);
  });
}

function searchJobs() {
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = jobs.filter(job => job.title.toLowerCase().includes(query));
  displayJobs(filtered);
}

function applyJob(index) {
  if (!currentUser) return;

  jobs[index].applicants.push(currentUser);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Applied successfully!");
}