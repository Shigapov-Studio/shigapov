import PostsList from "../components/PostList";
import useHeaderStore from "../store/useHeaderStore";
import BreadCrumb from "../components/BreadCrumb";


function PostsPage() {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  return (
    <div className="lcontainer" style={{paddingTop: headerHeight}}>
      <BreadCrumb href={'/'} text={'Главная'} />
      <h1 className="posts-page__heading">Кейсы</h1>
      <PostsList all={true}/>
    </div>
  )
}

export default PostsPage