// api/guestbook.js

const entries = [];

export default (req, res) => {
    if (req.method === 'POST') {
        const entry = req.body;
        entry.timestamp = new Date().toLocaleString();
        entries.push(entry);
        res.status(201).json(entry);
    } else if (req.method === 'GET') {
        res.status(200).json(entries);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
