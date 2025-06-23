let users = [];

// Carica utenti all'avvio
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users = await response.json();
        renderTable(users);
    } catch (error) {
        console.error("Errore durante il fetch:", error);
    }
});

// Elementi DOM
const filterInput = document.getElementById('filterInput');
const filterField = document.getElementById('filterField');
const userTableBody = document.getElementById('userTableBody');

// Ascolta input e dropdown
filterInput.addEventListener('input', filterAndRender);
filterField.addEventListener('change', filterAndRender);

function filterAndRender() {
    const field = filterField.value;
    const searchTerm = filterInput.value.toLowerCase();
    const filtered = users.filter(user => {
        if (field === 'name') {
            const [firstName, lastName] = user.name.toLowerCase().split(' ');
            return (
                firstName.startsWith(searchTerm) ||
                (lastName && lastName.startsWith(searchTerm))
            );
        } else {
            return user[field].toLowerCase().startsWith(searchTerm)
        }

    });

    renderTable(filtered);
}

function renderTable(data) {
    if (data.length === 0) {
        userTableBody.innerHTML = `
        <tr>
           <td colspan="3" class="text-center text-danger">
             Nessun utente trovato
           </td>
        </tr>`;
        return;
    }
    userTableBody.innerHTML = data.map(user => `
        <tr>
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
        </tr>
      `).join('');
}
