import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostPreview = ({ post, getImageUrl, index }) => {
  const delayMultiplier = index % 2 === 0 ? 0 : 0.2;
  const { acf = {}, title = {}, excerpt = {}, slug } = post;

  return (
    <motion.div
      className="post__preview"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delayMultiplier, duration: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="post__preview--top">
        <Link to={`/post/${slug}`} className="post__preview--wrapper">
          <img
            loading="lazy"
            className="post__preview--img"
            src={getImageUrl(post)}
            alt={title.rendered || 'Пост'}
          />
        </Link>
        <Link to={`/post/${slug}`}>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + delayMultiplier, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="post__preview--heading"
          >
            {title.rendered}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + delayMultiplier, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="post__preview--descr"
            dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
          />
        </Link>
      </div>

      <div className="post__preview--additional">
        {acf.cooperation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + delayMultiplier, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="button__additional"
          >
            {acf.cooperation}
          </motion.div>
        )}
        {acf.role && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + delayMultiplier, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="button__additional"
          >
            {acf.role}
          </motion.div>
        )}
      </div>

      {acf.link && (
        <a
          className="post__preview--href"
          href={acf.link}
          rel="noreferrer"
          target="_blank"
        >
          <p>На сайт</p><span className="icon-arr"></span>
        </a>
      )}
    </motion.div>
  );
};

export default PostPreview;
