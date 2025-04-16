import { useState, useEffect } from 'react';
import Home from './SearchPage';
import AddBook from './add-book'; 

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#1e1e1e' : '#fdf6e3';
    document.body.style.color = darkMode ? '#eee' : '#2e2e2e';
  }, [darkMode]);

  return (
    <div style={styles.wrapper}>
      {/* NAVBAR */}
      <nav style={{ ...styles.navbar, backgroundColor: darkMode ? '#333' : '#7e4f2e' }}>
        <h2 style={styles.logo}>📚 BookApp</h2>
        <div style={styles.navControls}>
          <button style={styles.button} onClick={() => setShowModal(true)}>Add Book</button>
       
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <Home />
      </main>

      {/* FOOTER */}
      <footer style={{ ...styles.footer, backgroundColor: darkMode ? '#222' : '#f0e5d8' }}>
        <p>© {new Date().getFullYear()} BookApp · Developed by Deepak Jain</p>
        <div style={styles.socials}>
          <a href="mailto:contact@bookapp.com">✉️ Email</a>
          <a href="https://twitter.com" target="_blank">🐦 Twitter</a>
          <a href="https://github.com" target="_blank">💻 GitHub</a>
        </div>
      </footer>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={styles.closeBtn}>×</button>
            <AddBook />
          </div>
        </div>
      )}
    </div>
  );
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
  toggle: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
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
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '700px',
    width: '90%',
    position: 'relative',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  },
  closeBtn: {
    position: 'absolute',
    top: '0.8rem',
    right: '1rem',
    fontSize: '1.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  }
};
