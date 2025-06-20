let currentUser = null;
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const users = getStoredUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('login-message').innerText = 'Invalid username or password.';
  }
}
function signup() {
  const username = document.getElementById('newUsername').value.trim();
  const password = document.getElementById('newPassword').value;

  if (!username || !password) {
    document.getElementById('signup-message').innerText = 'All fields are required.';
    return;
  }

  const users = getStoredUsers();
  const userExists = users.some(u => u.username === username);

  if (userExists) {
    document.getElementById('signup-message').innerText = 'Username already exists.';
    return;
  }
  

  users.push({ username, password });
  saveUsers(users);

  localStorage.setItem('user', JSON.stringify({ username, password }));
  window.location.href = 'dashboard.html';
}
function redirectToSignup() {
  window.location.href = 'signup.html';
}




function getStoredUsers() {
  const localUsers = localStorage.getItem('users');
  return localUsers ? JSON.parse(localUsers) : [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}


window.onload = function() {
  const path = window.location.pathname;
  if (path.includes('dashboard.html')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = 'index.html';
    } else {
      document.getElementById('user').innerText = user.username;
    }
  }
};

function analyzeFood() {
  const image = document.getElementById('foodImage').files[0];
  const conditions = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value);

  if (!image) {
    alert('Please upload a food image.');
    return;
  }

  // Placeholder: simulate ML prediction by food name (use real model in practice)
  const simulatedFood = 'Pizza'; // Assume ML predicted this from image

  fetch('food_data.json')
    .then(res => res.json())
    .then(data => {
      const foodInfo = data.find(f => f.name.toLowerCase() === simulatedFood.toLowerCase());
      if (!foodInfo) {
        document.getElementById('result').innerText = 'Food not recognized.';
        return;
      }

      const badFor = foodInfo.restricted_for;
      const conflict = conditions.filter(cond => badFor.includes(cond));
      if (conflict.length > 0) {
        document.getElementById('result').innerText = ` is NOT recommended for: ${conflict.join(', ')}`;
      } else {
        document.getElementById('result').innerText = ` is healthy for your conditions.`;
      }
    });
}
