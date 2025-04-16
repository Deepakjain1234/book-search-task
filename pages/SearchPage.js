import { useState, useEffect } from 'react';
import Link from 'next/link';

const RESULTS_PER_PAGE = 5;
const GENRES = ['All', 'Fiction', 'Non-fiction', 'Fantasy', 'Science', 'Biography'];

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setIsDark(document.body.style.backgroundColor === '#1e1e1e');
  }, []);

  useEffect(() => {
    filterAndSort();
    setCurrentPage(1);
  }, [results, genre, sortOrder]);

  const filterAndSort = () => {
    let filtered = [...results];

    // Filter by genre
    if (genre !== 'All') {
      filtered = filtered.filter(book =>
        book.category?.toLowerCase() === genre.toLowerCase()  // Checking 'category' instead of 'genre'
      );
    }

    // Sorting by title based on the selected order
    filtered.sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    setFilteredResults(filtered);
  };

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    setError('');

    try {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      if (data.length === 0) {
        setError('No results found');
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredResults.length / RESULTS_PER_PAGE);

  return (
    <div style={{ ...styles.container, backgroundColor: isDark ? '#2c2c2c' : '#fff', color: isDark ? '#eee' : '#2e2e2e' }}>
      <h1 style={styles.heading}>📖 Search Books</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            ...styles.input,
            backgroundColor: isDark ? '#444' : '#fff',
            color: isDark ? '#eee' : '#000',
            border: isDark ? '1px solid #666' : '1px solid #ccc',
          }}
        />
        <button onClick={searchBooks} style={styles.button}>Search</button>
      </div>

      <div style={styles.filters}>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} style={styles.select}>
          {GENRES.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={styles.select}>
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
      </div>

      {loading && <p style={styles.loading}>🔄 Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <ul style={styles.list}>
        {paginatedResults.map(book => (
          <li key={book.id} style={{ ...styles.listItem, borderBottom: isDark ? '1px solid #444' : '1px solid #eee' }}>
            <div style={styles.resultCard}>
              <img
                src={book.image || 'https://via.placeholder.com/80x110?text=No+Image'}
                alt={book.title}
                style={styles.thumbnail}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?fit=crop&w=80&h=110&q=80';
                }}
              />
              <div style={styles.details}>
                <Link href={`/book/${book.id}`} legacyBehavior>
                  <a style={{ ...styles.link, color: isDark ? '#90cdf4' : '#0070f3' }}>
                    {book.title}
                  </a>
                </Link>
                <p style={styles.meta}><strong>Author:</strong> {book.author}</p>
                {book.category && <p style={styles.meta}><strong>Category:</strong> {book.category}</p>} {/* Changed from genre */}
                {book.published && <p style={styles.meta}><strong>Published:</strong> {book.published}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {filteredResults.length > 0 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...styles.pageButton,
                backgroundColor: currentPage === i + 1 ? '#7e4f2e' : '#eee',
                color: currentPage === i + 1 ? '#fff' : '#000',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Georgia', serif",
    transition: 'all 0.3s ease-in-out',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#7e4f2e',
  },
  controls: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    backgroundColor: '#7e4f2e',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  loading: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
  },
  resultCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  thumbnail: {
    width: '80px',
    height: '110px',
    objectFit: 'cover',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    flexShrink: 0,
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#666',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
    gap: '0.5rem',
  },
  pageButton: {
    padding: '0.5rem 0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
