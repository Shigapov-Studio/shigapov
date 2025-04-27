import Form from "../components/Form";
import useHeaderStore from "../store/useHeaderStore";

function FormPage() {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  return (
    <div style={{marginTop: headerHeight}} className="lcontainer">
      <div className="" style={{width: '600px'}}><Form /></div>
      
    </div>
  )
}

export default FormPage