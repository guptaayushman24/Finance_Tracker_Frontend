import { useSelector } from "react-redux";
function ViewFinanceDetail(){
   const firstName = useSelector((state)=>state.profile.firstName);
   const lastName = useSelector((state)=>state.profile.lastName);
  return(
    <div>
      Welcome {firstName +" "+ lastName}
    </div>
  )
}
export default ViewFinanceDetail;