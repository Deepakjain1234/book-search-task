import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';

export default function BookDetails({ book, similarBooks }) {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#1e1e1e' : '#fdf6e3';
    document.body.style.color = darkMode ? '#eee' : '#2e2e2e';
  }, [darkMode]);

  if (!book) return <p style={styles.notFound}>Book not found</p>;

  // Function to handle book click and navigate to the clicked book's details page
  const handleBookClick = (id) => {
    router.push(`/book/${id}`);
  };

  return (
    <div style={styles.wrapper}>
      {/* NAVBAR */}
      <nav style={{ ...styles.navbar, backgroundColor: darkMode ? '#333' : '#7e4f2e' }}>
        <h2 style={styles.logo}>📚 BookApp</h2>
        <div style={styles.navControls}>
          {/* <button style={styles.button} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button> */}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <div style={styles.card}>
          <img src={book.image} alt={book.title} style={styles.image} />
          <div style={styles.info}>
            <h1 style={styles.title}>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Published:</strong> {book.launchDate}</p>
            <p style={styles.description}>{book.description}</p>
          </div>
        </div>

        <h2>Similar Books</h2>
        <div style={styles.similarBooks}>
          {similarBooks.map((similarBook) => (
            <div 
              key={similarBook.id} 
              style={styles.similarCard} 
              onClick={() => handleBookClick(similarBook.id)} // Handle click to navigate
            >
              <img src={similarBook.image} alt={similarBook.title} style={styles.similarImage} />
              <h3 style={styles.similarTitle}>{similarBook.title}</h3>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ ...styles.footer, backgroundColor: darkMode ? '#222' : '#f0e5d8' }}>
        <p>© {new Date().getFullYear()} BookApp · Built with ❤️ using Next.js</p>
        <div style={styles.socials}>
          <a href="mailto:contact@bookapp.com">✉️ Email</a>
          <a href="https://twitter.com" target="_blank">🐦 Twitter</a>
          <a href="https://github.com" target="_blank">💻 GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const book = data.find(b => b.id === id);
  const similarBooks = data.filter(b => b.id !== id && (b.title.includes(book.title) || b.category === book.category));

  return {
    props: {
      book: book || null,
      similarBooks
    }
  };
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Georgia', serif",
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  logo: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  navControls: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    color: '#7e4f2e',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
  },
  card: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    border: '1px solid #eee',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#fff',
  },
  image: {
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  description: {
    marginTop: '1rem',
    color: '#333',
    lineHeight: '1.6',
  },
  notFound: {
    textAlign: 'center',
    marginTop: '4rem',
    fontSize: '1.5rem',
    color: 'red',
  },
  footer: {
    padding: '1.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    borderTop: '1px solid #ccc',
  },
  socials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '0.5rem',
  },
  similarBooks: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    marginTop: '2rem',
  },
  similarCard: {
    width: '200px',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    padding: '1rem',
    cursor: 'pointer', 
  },
  similarImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  similarTitle: {
    marginTop: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};
