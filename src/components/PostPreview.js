import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostPreview = ({ post, getImageUrl, index }) => {
  const delayMultiplier = index%2 === 0? 0.2 : 0.4;
  return (
    <motion.div className="post__preview"
    initial={{ opacity: 0, y: 50 }} // Начальное состояние: прозрачный и смещен вниз
    whileInView={{ opacity: 1, y: 0 }} // Конечное состояние: видимый и в исходной позиции
    transition={{ delay: delayMultiplier, duration: 0.2, ease: "easeOut" }} // Задержка зависит от индекса
    viewport={{ once: true }} // Анимация срабатывает только один раз
    >
      <div className='post__preview--top'>
        <Link to={`/post/${post.id}`} className="post__preview--wrapper">
          <img
            loading="lazy"
            className="post__preview--img"
            src={getImageUrl(post)}
            alt={post.title.rendered || 'Пост'}
          />
        </Link>
        <Link to={`/post/${post.id}`}>
          <motion.h2
            initial={{ opacity: 0, y: 10 }} // Начальное состояние: прозрачный и смещен вниз
            whileInView={{ opacity: 1, y: 0 }} // Конечное состояние: видимый и в исходной позиции
            transition={{ delay: 0.1 + delayMultiplier, duration: 0.3, ease: "easeOut" }} // Задержка зависит от индекса
            viewport={{ once: true }} // Анимация срабатывает только один раз
            className="post__preview--heading"
          >
            {post.title.rendered}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} // Начальное состояние: прозрачный и смещен вниз
            whileInView={{ opacity: 1, y: 0 }} // Конечное состояние: видимый и в исходной позиции
            transition={{ delay: 0.2 + delayMultiplier, duration: 0.3, ease: "easeOut" }} // Задержка зависит от индекса
            viewport={{ once: true }} // Анимация срабатывает только один раз
            className="post__preview--descr"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </Link>
      </div>
      <div className="post__preview--additional">
        <motion.div 
        initial={{ opacity: 0, y: 10 }} // Начальное состояние: прозрачный и смещен вниз
        whileInView={{ opacity: 1, y: 0 }} // Конечное состояние: видимый и в исходной позиции
        transition={{ delay: 0.3 + delayMultiplier, duration: 0.3, ease: "easeOut" }} // Задержка зависит от индекса
        viewport={{ once: true }} // Анимация срабатывает только один раз        
        className="button__additional">{post.acf.cooperation}</motion.div>
        <motion.div 
        initial={{ opacity: 0, y: 10 }} // Начальное состояние: прозрачный и смещен вниз
        whileInView={{ opacity: 1, y: 0 }} // Конечное состояние: видимый и в исходной позиции
        transition={{ delay: 0.4 + delayMultiplier, duration: 0.3, ease: "easeOut" }} // Задержка зависит от индекса
        viewport={{ once: true }} // Анимация срабатывает только один раз
        className="button__additional">{post.acf.role}</motion.div>
      </div>
      <a
        className="post__preview--href"
        href={post.acf.link}
        rel="noreferrer"
        target="_blank"
      >
        <p>На сайт</p><span className='icon-arr'></span>
      </a>
    </motion.div>
  );
};

export default PostPreview;