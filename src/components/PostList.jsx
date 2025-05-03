import { useState, useEffect, useMemo } from 'react';
import PostPreview from './PostPreview';
import Loader from './Loader';

const PostsList = ({ visibles, all = false, random = false }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch('https://wp.shigapov.studio/wp-json/wp/v2/posts?_embed', { signal: controller.signal })
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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, posts.length));
  };

  // 🔀 Мемоизированный массив постов, рандомизированный при загрузке
  const displayedPosts = useMemo(() => {
    const postsToShow = [...posts]; // копируем массив
    if (random) {
      for (let i = postsToShow.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [postsToShow[i], postsToShow[j]] = [postsToShow[j], postsToShow[i]];
      }
    }
    return postsToShow;
  }, [posts, random]);

  return (
    <div className="cases__posts">
      {loading && <Loader />}
      {error && <div>Ошибка: {error}</div>}
      {!loading && !error && (
        all
          ? displayedPosts.slice(0, visiblePosts).map((post, index) => (
              <PostPreview
                key={post.id}
                post={post}
                index={index}
                getImageUrl={getImageUrl}
              />
            ))
          : displayedPosts.slice(0, visibles).map((post, index) => (
              <PostPreview
                key={post.id}
                post={post}
                index={index}
                getImageUrl={getImageUrl}
              />
            ))
      )}
      {displayedPosts.length > visiblePosts && all && (
        <button onClick={loadMorePosts} className="cases__load-more">
          Показать еще <span className="icon-arr"></span>
        </button>
      )}
    </div>
  );
};

export default PostsList;
