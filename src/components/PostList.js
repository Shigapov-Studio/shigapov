import { useState, useEffect } from 'react';
import PostPreview from './PostPreview';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Загружаем посты
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch('https://a1w.ru/wp-json/wp/v2/posts?_embed', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка загрузки постов');
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => {
        if (error.name !== 'AbortError') setError(error.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  // Отслеживаем ширину окна
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функция для получения URL картинки
  const getImageUrl = (post) => {
    const featuredMediaArray = post._embedded?.['wp:featuredmedia'];
    if (!featuredMediaArray) return '/path/to/placeholder.jpg';

    const featuredMedia = featuredMediaArray[0];
    const mediaSizes = featuredMedia?.media_details?.sizes;

    if (windowWidth < 767) {
      return mediaSizes?.medium_large?.source_url || mediaSizes?.full?.source_url || '/path/to/placeholder.jpg';
    } else if (windowWidth < 2000) {
      return mediaSizes?.large?.source_url || mediaSizes?.full?.source_url || '/path/to/placeholder.jpg';
    } else {
      return mediaSizes?.["1536x1536"]?.source_url || mediaSizes?.full?.source_url || '/path/to/placeholder.jpg';
    }
  };

  return (
    <div className="cases__posts">
      {loading && <div>Загружаем посты...</div>}
      {error && <div>Ошибка: {error}</div>}
      {!loading && !error && (
        <>
          {posts.slice(0, visiblePosts).reverse().map((post, index) => (
            <PostPreview
              key={post.id}
              post={post}
              index={index}
              getImageUrl={getImageUrl} // Передаём функцию как пропс
            />
          ))}
          {visiblePosts < posts.length && posts.length > 6 && (
            <button onClick={() => setVisiblePosts(posts.length)}>Смотреть все</button>
          )}
        </>
      )}
    </div>
  );
};

export default PostsList;