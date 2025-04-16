import { useState, useEffect } from 'react';

const GENRES = ['All', 'Fiction', 'Non-fiction', 'Fantasy', 'Science', 'Biography'];

export default function AddBook() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    image: '',
    isbn: '',
    published: '',
    description: '',
    category: 'All' // Default category
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.body.style.backgroundColor === '#1e1e1e');
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Book added!');
    setForm({
      title: '',
      author: '',
      image: '',
      isbn: '',
      published: '',
      description: '',
      category: 'All' // Reset category after submission
    });
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        ...styles.form,
        backgroundColor: isDark ? '#2c2c2c' : '#fff',
        color: isDark ? '#eee' : '#333'
      }}
    >
      <h2 style={styles.heading}>📘 Add New Book</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={e => handleChange('title', e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Author"
        value={form.author}
        onChange={e => handleChange('author', e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Image URL"
        value={form.image}
        onChange={e => handleChange('image', e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="ISBN"
        value={form.isbn}
        onChange={e => handleChange('isbn', e.target.value)}
        style={styles.input}
      />

      <label htmlFor="published" style={styles.label}>Published Date</label>
      <input
        type="date"
        id="published"
        value={form.published}
        onChange={e => handleChange('published', e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => handleChange('description', e.target.value)}
        rows="4"
        style={{ ...styles.input, resize: 'vertical' }}
      />

      <label htmlFor="category" style={styles.label}>Category</label>
      <select
        id="category"
        value={form.category}
        onChange={e => handleChange('category', e.target.value)}
        style={styles.input}
      >
        {GENRES.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <button type="submit" style={styles.button}>Add Book</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Georgia', serif",
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'all 0.3s ease',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#7e4f2e',
    textAlign: 'center',
  },
  input: {
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontFamily: "'Georgia', serif",
    outline: 'none',
  },
  button: {
    padding: '0.7rem',
    fontSize: '1rem',
    backgroundColor: '#7e4f2e',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  label: {
    fontSize: '1rem',
    marginTop: '0.5rem',
  }
};
