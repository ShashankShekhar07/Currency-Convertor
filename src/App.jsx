import { useState } from "react"
import { InputBox } from "./components"
import useCurrencyInfo from "./hooks/useCurrencyInfo"
function App () {
  const [amount,setAmount] = useState(0)
  const [convertedamount, setConvertedAmount] = useState(0)
  const [to,setTo] =useState ("inr")
  const [from,setFrom] = useState("usd")

  const data = useCurrencyInfo(from)

  const key = Object.keys(data)

  const swap = () => {
    setTo(from)
    setFrom(to)
    setAmount(convertedamount)
    setConvertedAmount(amount)
  }

  const answer = () => {
    setConvertedAmount(amount*data[to])
  }
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=600')`,
        }}
    >
      {/* <h1 className="text-3xl">hi</h1> */}
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-100 rounded-lg p-5 backdrop-blur-sm">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        answer()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            onCurrencyChange={(currency)=>setFrom(currency)}
                            onAmountChange={(amount) => setAmount(amount)}
                            currencyOptions={key}
                            selectCurrency={from}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedamount}
                            onCurrencyChange={(currency)=>setTo(currency)}
                            currencyOptions={key}
                            selectCurrency={to}                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert 
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}
export default App
