import PostsList from "../components/PostList";
import useHeaderStore from "../store/useHeaderStore";


function PostsPage() {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  return (
    <div className="lcontainer" style={{paddingTop: headerHeight}}>
      <PostsList all={true}/>
    </div>
  )
}

export default PostsPage