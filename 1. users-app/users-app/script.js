const form = document.getElementById('userForm');
const table = document.getElementById('userTable');
const searchInput = document.getElementById('search');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    contact: form.contact.value
  };
  await fetch('add-user.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  form.reset();
  loadUsers();
});

searchInput.addEventListener('input', loadUsers);

async function loadUsers() {
  const res = await fetch('get-users.php');
  const users = await res.json();
  const filter = searchInput.value.toLowerCase();
  table.innerHTML = '';
  users.forEach((user, index) => {
    if (Object.values(user).some(v => v.toLowerCase().includes(filter))) {
      const row = table.insertRow();
      ['firstName', 'lastName', 'email', 'contact'].forEach(key => {
        const cell = row.insertCell();
        cell.textContent = user[key];
        makeEditable(cell, key, index, user);
      });
      const delCell = row.insertCell();
      const btn = document.createElement('button');
      btn.textContent = 'Delete';
      btn.onclick = () => deleteUser(index);
      delCell.appendChild(btn);
    }
  });
}

async function deleteUser(index) {
  await fetch('delete-user.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index })
  });
  loadUsers();
}

function makeEditable(cell, key, index, user) {
  let timer = null;
  cell.ondblclick = () => {
    cell.contentEditable = true;
    cell.classList.add('editing');
    const oldValue = cell.textContent;

    const save = () => {
      cell.contentEditable = false;
      cell.classList.remove('editing');
      if (cell.textContent !== oldValue) {
        user[key] = cell.textContent;
        fetch('update-user.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index, user })
        });
      }
    };

    cell.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(timer);
        save();
      }
    };

    clearTimeout(timer);
    timer = setTimeout(save, 5000);
  };
}

window.onload = loadUsers;