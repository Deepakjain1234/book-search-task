import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { q } = req.query;
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(data)

  const results = data.filter(book =>
    book.title.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).json(results);
}