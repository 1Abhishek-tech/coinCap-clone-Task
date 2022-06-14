import React from 'react'

export const MarketData = () => {
  return (
    <div className='p-2 container flex justify-content-around text-primary'>
        <div className="p-2 flex flex-column "><span>MARKET CAP</span><span>$1.24T</span></div>
        <div className="p-2 flex flex-column "><span>EXCHANGE VOL</span><span>$117.82B</span></div>
        <div className="p-2 flex flex-column "><span>ASSETS</span><span>2,301</span></div>
        <div className="p-2 flex flex-column "><span>EXCHANGES</span><span>73</span></div>
        <div className="p-2 flex flex-column "><span>MARKETS</span><span>15,016</span></div>
        <div className="p-2 flex flex-column "><span>BTC DOMINDEX</span><span>34.4%</span></div>
    </div>
  )
}
