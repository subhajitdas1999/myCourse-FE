/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"


function App() {
  // const [count, setCount] = useState(0)
  const handleOpenRazorpay = (orderData : any) =>{
    const options = {
      "key": import.meta.env.VITE_RAZORYPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      "amount": orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": orderData.currency,
      "name": "Subhajit's Course", //your business name
      "description": "Test Transaction",
      "order_id": orderData.id, 
      "handler": function (response : any){
        const responseData = {
          razorpay_payment_id:response.razorpay_payment_id,
          razorpay_order_id:response.razorpay_order_id,
          razorpay_signature:response.razorpay_signature
        }
        axios.post("http://localhost:3000/payment/verify",responseData).then((res)=>{
          console.log(res);
          
        }).catch(err =>{
          console.log(err);
          
        })
        
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "Bittu Das", //your customer's name
          "email": "gaurav.kumar@example.com", 
          "contact": "9000090#3399cc000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "India"
      },
      "theme": {
          "color": "#53a20e"
      }
    }
  
    const rzp1 = new (window as any).Razorpay(options);
    

  
    rzp1.open();
    // rzp1.on('payment.failed', function (response) {
    //   // Handle payment failure here
    //   console.log(response.error);
    // })
    
  }
  const handlePayment =async(amount:number) =>{
    const reqBody = {amount}
    const res = await axios.post("http://localhost:3000/payment/createOrder",reqBody)
    console.log(res.data);

    handleOpenRazorpay(res.data)
    
  }
  return (
    <>
      <p>Hallo world</p>
      <button onClick={() => handlePayment(10)}>buyNow</button>
    </>
  )
}

export default App
