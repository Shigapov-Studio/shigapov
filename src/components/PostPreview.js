import { Link } from 'react-router-dom';

const PostPreview = ({ post, getImageUrl, index }) => {

  return (
    <div className="post__preview"
    >
      <div className='post__preview--top'>
        <div className="post__preview--wrapper">
          <img
            loading="lazy"
            className="post__preview--img"
            src={getImageUrl(post)}
            alt={post.title.rendered || 'Пост'}
          />
        </div>
        <Link to={`/post/${post.id}`}>
          <h2
            className="post__preview--heading"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p
            className="post__preview--descr"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </Link>
      </div>
      <div className="post__preview--additional">
        <div className="button__additional">{post.acf.cooperation}</div>
        <div className="button__additional">{post.acf.role}</div>
      </div>
      <a
        className="post__preview--href"
        href={post.acf.link}
        rel="noreferrer"
        target="_blank"
      >
        <p>На сайт</p><span className='icon-arr'></span>
      </a>
    </div>
  );
};

export default PostPreview;