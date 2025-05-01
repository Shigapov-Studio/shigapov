import React from "react";
import Slider from "../components/Slider";
import Solutions from "../components/Solutions";
import PostsList from "../components/PostList";
import AnimatedHeading from '../components/AnimatedHeading';
import casesImg from '../assets/figure.svg';
import solutionsImg from '../assets/figure2.svg';
import useHeaderStore from "../store/useHeaderStore";
import { Link } from "react-router";

const Home = () => {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  return (
    <>
      <div className='outer__container'>
        <section
        className='section__one'
        style={{paddingTop: `${headerHeight}px`}}>
          <Slider />
        </section>
      </div>
      <div className='lcontainer'>
        <section
        className='cases__section'>
          <AnimatedHeading heading={'Кейсы'} img={casesImg} headingClass={'cases'}/>
          <PostsList visibles={6} />
          <Link to='/posts' className='view-all'> Смотреть все<span className='icon-arr'></span></Link>
        </section>
      </div>
      <div className='outer__container'>
        <section className='solutions__section'>
          <div className='inner__container slutions__heading--bg'>
            <AnimatedHeading heading={'Решения'} img={solutionsImg} headingClass={'solutions'}/>
          </div>
          <Solutions />
        </section>
      </div>
    </>
  );
};

export default Home;
