import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newBook = req.body;
    newBook.id = Date.now().toString();

    const filePath = path.join(process.cwd(), 'data', 'books.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(201).json({ message: 'Book added' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}