import React, { useEffect, useState, useMemo } from "react";
import { Table, useMultiState } from "elementz";
import { Loading } from "elementz";
import axios from "axios";


function numFormatter(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "b"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "m"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "k"

    : Math.abs(Number(labelValue));

}

export const TableList = () => {
  const [config, setConfig] = useMultiState({
    rows: 10000,
    scrollable: false,
    expandable: false,
    searchable: true,
    filterable: true,
    sortable: true,
    selectable: true,
    fixed: true,
    empty: false,
    loading: false,
  });
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState(50);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState([]);
  const [ButtonDisabled, setButtonDisabled] = useState(false);

  const viewMore = () => {
    setButtonDisabled(true)
    setItems(items+50)
    fetchCheckEmail()
    setButtonDisabled(false)
    console.log(items)
  };

  const fetchCheckEmail = async () => {
    // setLoading(true);
    const response = await axios(`https://api.coincap.io/v2/assets?limit=${items}`).catch((err) =>
    console.log(err)
    );
    // console.log(response.data.data)
    if(response){
          const data = response.data.data.map((item,i) => { 
          const { rank ,symbol, name, priceUsd ,marketCapUsd,vwap24Hr, supply, volumeUsd24Hr,changePercent24Hr } = item ;
          return {
            rank,
            symbol : symbol.toLowerCase(),
            name : name,
            // name : ` ${<img src="https://assets.coincap.io/assets/icons/eth@2x.png" alt="img" /> } `  + name,
            priceUsd : `$${ parseFloat(priceUsd).toFixed(2) }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") ,
            marketCapUsd :'$'+ numFormatter(marketCapUsd),
            vwap24Hr : `$${ parseFloat(vwap24Hr).toFixed(2) }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") , 
            supply : numFormatter(supply),
            volumeUsd24Hr :'$'+ numFormatter(volumeUsd24Hr),
            changePercent24Hr : `${ parseFloat(changePercent24Hr).toFixed(2) }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%'
          };
        });
        // console.log(data)
        setCheckEmail(data);
        // setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchCheckEmail();
    setLoading(false);
  }, [setCheckEmail]);


  const columns = {
    rank: {
      title: "Rank",
    },
    symbol : {
      title : "Icon",
      onRender: (symbol , row, i)=>(
        <img src={`https://assets.coincap.io/assets/icons/${symbol}@2x.png`} alt="hey" width={28}/>
      )
    },
    name  : {
      title: "Name",
    },
    priceUsd: {
      title: "Price",
    },
    marketCapUsd: {
      title: "Market Cap",
    },
    vwap24Hr: {
      title: "VWAP(24Hr)",
    },
    supply: {
      title: "Supply",
    },
    volumeUsd24Hr: {
      title: "Volume (24Hr)",
    },
    changePercent24Hr: {
      title: "Change (24Hr)",
      onRender: (changePercent24Hr, row, i)=>(
        <div className={`${changePercent24Hr>"0" ? 'text-success' : 'text-danger'}`} >
          {changePercent24Hr }
        </div>
      )
    },
  };

  const memoizedColumns = useMemo(() => columns, []);
  if (loading) {
    return <Loading center primary xl isLoading={true} />;
  }
  return (
    <>
      <div className="TableList center  flex flex-column container">
        <Table
          columns={memoizedColumns}
          data={config.empty ? [] : checkEmail}
          sortable={config.sortable}
          searchable={config.searchable}
          filterable={config.filterable}
          selectable={!config.selectable}
          paginate={!config.scrollable}
          limit={50+items}
          scrollable={config.scrollable ? "500px" : false}
          fixed={!config.fixed}
          loading={config.loading}
          expandable={config.expandable}
          onExpand={(row, i) => <span>Oh, You expanded me #{i}</span>}
          actionHidden
          selected={!selected}
          onMobile={(row, i) => (
            <div className="pt-30 pb-30 m-auto">
              <div>
                <b>Rank.</b> {row.rank}
              </div>
              <div>
                <b>Name.</b> {row.name}
              </div>
              <div>
                <b>Price.</b> {row.priceUsd}
              </div>
              <div>
                <b>Market Cap.</b> {row.marketCapUsd}
              </div>
              <div>
                <b>VWAP(24Hr).</b> {row.vwap24Hr}
              </div>
              <div>
                <b>Supply.</b> {row.supply}
              </div>
              <div>
                <b>Volume (24Hr).</b> {row.volumeUsd24Hr}
              </div>
              <div>
                <b>Change (24Hr).</b> {row.changePercent24Hr}
              </div>
            </div>
          )}
        />
      </div>
      <div className="d-flex justify-content-center m-4 viewmore">
      {ButtonDisabled ?
      <Loading primary md isLoading={true} />
      :
      <button type="button" className="btn btn_nav " onClick={viewMore} disabled={ButtonDisabled}>View More</button>    
    }
      </div>
      </>
  )
}


