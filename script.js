document.addEventListener('DOMContentLoaded', (event) => {
    const contactButton = document.getElementById('contact-button');
    const guestbookButton = document.getElementById('guestbook-button');
    const contactModal = document.getElementById('contact-modal');
    const guestbookModal = document.getElementById('guestbook-modal');
    const closeButtons = document.querySelectorAll('.close-button');

    contactButton.addEventListener('click', () => {
        contactModal.style.display = 'block';
    });

    guestbookButton.addEventListener('click', () => {
        guestbookModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
        if (event.target === guestbookModal) {
            guestbookModal.style.display = 'none';
        }
    });

    // 处理留言板提交
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.getElementById('guestbook-entries');

    guestbookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('guest-name').value;
        const message = document.getElementById('guest-message').value;

        const entry = {
            name: name,
            message: message,
            timestamp: new Date().toLocaleString()
        };

        // 使用 Vercel 部署的后端 API URL
        fetch('https://my-personal-website-pi-three.vercel.app/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            displayEntries();
            guestbookForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    function displayEntries() {
        guestbookEntries.innerHTML = '';

        // 使用 Vercel 部署的后端 API URL
        fetch('https://my-personal-website-pi-three.vercel.app/api/guestbook')
        .then(response => response.json())
        .then(entries => {
            entries.forEach((entry) => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'guestbook-entry';
                entryDiv.innerHTML = `<p><strong>${entry.name}</strong> (${entry.timestamp}):</p><p>${entry.message}</p>`;
                guestbookEntries.appendChild(entryDiv);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    displayEntries();
});
