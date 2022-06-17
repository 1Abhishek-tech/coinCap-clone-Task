import React from 'react'

export const MarketData = () => {
  return (
  <div  className="marketData fluid bg-primary bg-gradient ">
    <div className='marketData__element p-2 container flex align-items-center justify-content-around font-weight-bold text-white '>
        <div className="p-2 flex flex-column align-items-center "><span>MARKET CAP</span><span>$1.24T</span></div>
        <div className="p-2 flex flex-column align-items-center"><span>EXCHANGE VOL</span><span>$117.82B</span></div>
        <div className="p-2 flex flex-column align-items-center"><span>ASSETS</span><span>2,301</span></div>
        <div className="p-2 flex flex-column align-items-center"><span>EXCHANGES</span><span>73</span></div>
        <div className="p-2 flex flex-column align-items-center"><span>MARKETS</span><span>15,016</span></div>
        <div className="p-2 flex flex-column align-items-center"><span>BTC DOMINDEX</span><span>34.4%</span></div>
    </div>
    </div>
  )
}
