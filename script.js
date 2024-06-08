document.addEventListener('DOMContentLoaded', (event) => {
    const contactButton = document.getElementById('contact-button');
    const guestbookButton = document.getElementById('guestbook-button');
    const contactModal = document.getElementById('contact-modal');
    const guestbookModal = document.getElementById('guestbook-modal');
    const closeButtons = document.querySelectorAll('.close-button');

    // 处理点击 "联系我" 按钮
    contactButton.addEventListener('click', () => {
        contactModal.style.display = 'block';
    });

    // 处理点击 "留言板" 按钮
    guestbookButton.addEventListener('click', () => {
        guestbookModal.style.display = 'block';
    });

    // 处理点击关闭按钮
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // 处理点击模态框外部关闭模态框
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

        let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.push(entry);
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));

        displayEntries();
        guestbookForm.reset();
    });

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

    displayEntries();
});
