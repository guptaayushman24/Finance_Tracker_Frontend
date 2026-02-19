import { useSelector } from "react-redux";
function ViewFinanceDetail(){
   const emailAddress = useSelector((state)=>state.emailAddress.emailAddress);
  return(
    <div>
      Welcome {emailAddress}
    </div>
  )
}
export default ViewFinanceDetail;