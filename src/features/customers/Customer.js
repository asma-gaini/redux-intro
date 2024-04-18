import { useSelector } from "react-redux";

function Customer() {
  //in customer hamon esmi hast k tu rootreducer tu store bara customerReducer entekhab kardim
  const customer = useSelector((store) => store.customer.fullName);
  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
