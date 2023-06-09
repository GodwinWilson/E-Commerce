import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Logo from '../assets/logo512.png'
import { selectEmail, selectUserName } from "../redux/features/authSlice";
import { useSelector } from "react-redux";


export default function Payment({ getTotalPrice }) {
    const email = useSelector(selectEmail)
    const username = useSelector(selectUserName)

    const config = {
    public_key: "FLWPUBK_TEST-2b48238e51ac4340932feb8556865d5b-X",
    tx_ref: Date.now(),
    amount: getTotalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: "070********",
      name: username,
    },
    customizations: {
      title: "GodwinShop",
      description: "Payment for items in cart",
      logo: {Logo},
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button
        className="bg-blue-500 text-white rounded py-1 px-2"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Proceed To Buy
      </button>
    </div>
  );
}
