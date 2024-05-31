document.addEventListener('DOMContentLoaded', (event) => {
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.getElementById('guestbook-entries');
    const contactButton = document.getElementById('contact-button');
    const modal = document.getElementById('contact-modal');
    const closeButton = document.querySelector('.close-button');

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('guest-name').value;
            const message = document.getElementById('guest-message').value;

            const entry = {
                name: name,
                message: message,
                timestamp: new Date().toLocaleString()
            };

            let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
            entries.push(entry);
            localStorage.setItem('guestbookEntries', JSON.stringify(entries));

            displayEntries();
            guestbookForm.reset();
        });
    }

    function displayEntries() {
        guestbookEntries.innerHTML = '';
        const entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.forEach((entry) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'guestbook-entry';
            entryDiv.innerHTML = `<p><strong>${entry.name}</strong> (${entry.timestamp}):</p><p>${entry.message}</p>`;
            guestbookEntries.appendChild(entryDiv);
        });
    }

    if (guestbookEntries) {
        displayEntries();
    }

    if (contactButton) {
        contactButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
