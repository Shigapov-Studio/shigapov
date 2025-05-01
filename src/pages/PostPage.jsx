import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHeaderStore from "../store/useHeaderStore";
import PostsList from "../components/PostList";
import LazyLoad from "../components/LazyLoad";
import Loader from "../components/Loader";
import BreadCrumb from "../components/BreadCrumb";

const PostPage = () => {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://wp.shigapov.studio/wp-json/wp/v2/posts?slug=${slug}&_embed`, {
      signal: controller.signal
    })
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка загрузки поста');
        return response.json();
      })
      .then((data) => {
        if (!data.length) throw new Error('Пост не найден');
        setPost(data[0]);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setError(error.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [slug]);

  if (loading) return <div className="lcontainer" style={{ marginTop: `${headerHeight}px` }}><Loader /></div>;
  if (error) return <div className="lcontainer" style={{ marginTop: `${headerHeight}px` }}>Ошибка: {error}</div>;
  if (!post) return null;

  const {
    acf: {
      desctopimg: desktopImg,
      mobileimg: mobImg,
      screen: screenshot,
      tarif,
      description,
      year,
      problem,
      solution,
      additional,
      link
    } = {},
    title: { rendered: title },
    _embedded
  } = post;

  const featuredImage = _embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <>
      <div style={{ marginTop: headerHeight }} className="lcontainer">
        <BreadCrumb href={'/posts'} text={'Кейсы'} />
        <div className="post__head">
          <div className="post__head-top">
            <h1>{title}</h1>
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <span className="icon-arr"></span>
                {link.replace(/(^\w+:|^)\/\//, '')}
              </a>
            )}
          </div>
          <div className="post__head-bottom">
            <p className="post__head-txt">Решение: <br /> Тариф "{tarif}"</p>
            <p className="post__head-txt--black">{description}</p>
            <p className="post__head-txt">Год: <br /> {year}</p>
          </div>
        </div>
      </div>
      {featuredImage && (
        <img
          src={featuredImage}
          alt={title}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      <div className="lcontainer">
        <div className="post__solution">
          <div className="post__problem">
            <h2 className="post__problem-heading">Задача</h2>
            <p className="post__problem-description">{problem}</p>
          </div>
          <div className="post__problem">
            <h2 className="post__problem-heading">Решение</h2>
            <p className="post__problem-description">{solution}</p>
          </div>
        </div>
      </div>
      <div className="outer__container">
        <section className="examples">
          <div className="inner__container">
            <div className="examples__top">
              {desktopImg && (
                <img
                  className="examples__img-desc"
                  src={desktopImg}
                  alt={title}
                />
              )}
              {mobImg && (
                <img className="examples__img-mob" src={mobImg} alt={title} />
              )}
            </div>
            {additional && <img className="examples__additional" src={additional} alt={title} />}
            <div className="examples__bottom">
              {screenshot && (
                <img src={screenshot} alt={title} />
              )}
            </div>
          </div>
        </section>
      </div>
      <div className="lcontainer">
        <div className="related-posts">
          <h2 className="related-posts__heading">Другие кейсы</h2>
          <LazyLoad>
            <PostsList visibles={2} random={true} />
          </LazyLoad>
        </div>
      </div>
    </>
  );
};

export default PostPage;
