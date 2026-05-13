import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const OnlinePayment = () => {

  const {
    navigate,
    user,
    getCartAmount,
    cartItems,
    products
  } = useAppContext();

  const [loading,setLoading] = useState(false)

  const items = Object.keys(cartItems).map((id)=>{
    const product = products.find(p=>p._id === id)

    return{
      ...product,
      quantity: cartItems[id]
    }
  })

  const total = (getCartAmount()*1.02).toFixed(2)

  const handleRazorpay = () => {

    if(!user){
      toast.error("Please login to continue payment")
      navigate("/")
      return
    }

    setLoading(true)

    const amount = Math.round(getCartAmount()*1.02*100)

    const options = {
     key: "rzp_test_SPWkiaPKiwJIjX",
      amount,
      currency:"INR",
      name:"FreshMart",
      description:"Secure Grocery Checkout",
      image:"/logo.png",

      handler:function(response){

        saveOrder(response.razorpay_payment_id)

        toast.success("Payment Successful 🎉")

        navigate("/my-orders")

      },

      prefill:{
        name:user.name,
        email:user.email
      },

      theme:{
        color:"#16a34a"
      }

    }

    const rzp = new window.Razorpay(options)

    rzp.open()

    setLoading(false)

  }

  const saveOrder = (paymentId) => {

    const newOrder = {

      _id:Date.now().toString(),

      paymentType:"Razorpay",

      paymentId,

      amount:total,

      items,

      status:"Paid",

      createdAt:new Date().toISOString()

    }

    const oldOrders = JSON.parse(localStorage.getItem("myOrders")) || []

    localStorage.setItem(
      "myOrders",
      JSON.stringify([newOrder,...oldOrders])
    )

  }

  return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

<div className="max-w-md w-full backdrop-blur-lg bg-white/80 shadow-2xl rounded-2xl p-8 border">

{/* HEADER */}

<h2 className="text-2xl font-semibold text-center">
Secure Checkout
</h2>

<p className="text-gray-500 text-sm text-center mt-1">
Powered by Razorpay
</p>


{/* PAYMENT METHODS */}

<div className="flex justify-center gap-3 mt-4 text-xs text-gray-500">

<span className="px-2 py-1 bg-gray-100 rounded">UPI</span>
<span className="px-2 py-1 bg-gray-100 rounded">Card</span>
<span className="px-2 py-1 bg-gray-100 rounded">Wallet</span>

</div>


{/* ORDER ITEMS */}

<div className="mt-6 max-h-40 overflow-y-auto">

{items.map((item,i)=>(

<div
key={i}
className="flex justify-between text-sm py-2 border-b"
>

<p className="text-gray-700">
{item.name} × {item.quantity}
</p>

<p className="font-medium">
₹{item.offerPrice * item.quantity}
</p>

</div>

))}

</div>


{/* ORDER SUMMARY */}

<div className="mt-6 bg-gray-50 p-4 rounded-lg">

<div className="flex justify-between text-sm text-gray-600">

<span>Subtotal</span>
<span>₹{getCartAmount()}</span>

</div>

<div className="flex justify-between text-sm text-gray-600 mt-2">

<span>Tax (2%)</span>
<span>₹{(getCartAmount()*0.02).toFixed(2)}</span>

</div>

<hr className="my-3"/>

<div className="flex justify-between text-lg font-semibold">

<span>Total</span>
<span className="text-primary">₹{total}</span>

</div>

</div>


{/* SECURITY BADGE */}

<div className="text-center text-xs text-gray-500 mt-3">
🔒 100% Secure Payment
</div>


{/* PAY BUTTON */}

<button onClick={() => handleRazorpay()}
disabled={loading}
className="w-full mt-6 py-3 rounded-lg bg-primary hover:bg-primary-dull text-white font-medium transition transform hover:scale-[1.02]"
>

{loading ? "Processing..." : `Pay ₹${total}`}

</button>


{/* BACK */}

<button
onClick={()=>navigate("/cart")}
className="w-full mt-4 text-primary text-sm underline"
>

Back to Cart

</button>

</div>

</div>

  )

}

export default OnlinePayment