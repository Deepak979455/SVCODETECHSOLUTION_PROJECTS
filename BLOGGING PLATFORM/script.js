const users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const posts = JSON.parse(localStorage.getItem("posts")) || [];

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authSection = document.getElementById("authSection");
const blogSection = document.getElementById("blogSection");
const userDisplayName = document.getElementById("userDisplayName");
const postsContainer = document.getElementById("postsContainer");
const createPostBtn = document.getElementById("createPostBtn");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("posts", JSON.stringify(posts));
}

function showSection() {
  if (currentUser) {
    blogSection.style.display = "block";
    authSection.style.display = "none";
    userDisplayName.textContent = currentUser.username;
    logoutBtn.style.display = "inline";
    loginBtn.style.display = signupBtn.style.display = "none";
    displayPosts();
  } else {
    blogSection.style.display = "none";
    authSection.style.display = "block";
    logoutBtn.style.display = "none";
    loginBtn.style.display = signupBtn.style.display = "inline";
  }
}

function displayPosts() {
  postsContainer.innerHTML = "";
  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>By: ${post.author}</small>
      ${
        currentUser.username === post.author
          ? `
          <button onclick="editPost(${index})">Edit</button>
          <button onclick="deletePost(${index})">Delete</button>`
          : ""
      }
      <button onclick="addComment(${index})">Comment</button>
      <div>
        ${post.comments
          .map((comment) => `<p class="comment">${comment}</p>`)
          .join("")}
      </div>
    `;
    postsContainer.appendChild(postDiv);
  });
}

loginBtn.addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

signupBtn.addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    currentUser = user;
    saveData();
    showSection();
  } else {
    alert("Invalid credentials");
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  if (users.some((user) => user.username === username)) {
    alert("User already exists");
  } else {
    users.push({ username, password });
    saveData();
    alert("Sign-up successful. Please log in.");
    signupForm.reset();
  }
});

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  saveData();
  showSection();
});

createPostBtn.addEventListener("click", () => {
  const title = prompt("Enter post title:");
  const content = prompt("Enter post content:");
  if (title && content) {
    posts.push({ title, content, author: currentUser.username, comments: [] });
    saveData();
    displayPosts();
  }
});

function deletePost(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    saveData();
    displayPosts();
  }
}

function addComment(index) {
  const comment = prompt("Enter your comment:");
  if (comment) {
    posts[index].comments.push(comment);
    saveData();
    displayPosts();
  }
}

function editPost(index) {
  const post = posts[index];
  const newTitle = prompt("Edit the title:", post.title);
  const newContent = prompt("Edit the content:", post.content);

  if (newTitle && newContent) {
    posts[index].title = newTitle;
    posts[index].content = newContent;
    saveData();
    displayPosts();
  }
}
showSection();
