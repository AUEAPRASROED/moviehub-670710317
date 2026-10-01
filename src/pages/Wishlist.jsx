import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { useAuth } from '../auth/AuthContext';
import { getWishlist } from '../api/backend'; // 1. import getWishlist เพิ่ม

function Wishlist() {
  const { token, member } = useAuth(); // 2. ดึง token ออกมาจาก useAuth()
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    getWishlist(token)
      .then((res) => {
        // เช็กว่าข้อมูลส่งมาเป็น res.items หรือ res โดยตรง ถ้าไม่ใช่ ให้เป็น []
        const movieList = Array.isArray(res) ? res : (res?.items || []);
        setMovies(movieList);
        setStatus('success');
      })
      .catch((err) => {
        setError(err.message);
        setStatus('error');
      });
  }, [token]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        รายการที่อยากดูของ {member?.displayName}
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        กดปุ่มหัวใจในหน้าหนังเพื่อเพิ่มเรื่องเข้ามาที่นี่
      </p>
      <MovieGrid movies={movies} status={status} error={error} />
    </div>
  );
}

export default Wishlist;