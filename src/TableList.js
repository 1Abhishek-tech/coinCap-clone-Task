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
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState([]);

  var headers = [
    { label: "Name", key: "name" },
    { label: "Price", key: "priceUsd" },
    { label: "Market Cap", key: "marketCapUsd" },
    { label: "VWAP(24Hr)", key: "vwap24Hr" },
    { label: "Supply", key: "supply" },
    { label: "Volume (24Hr)", key: "volumeUsd24Hr" },
    { label: "Change (24Hr)", key: "changePercent24Hr" },
  ];
  const fetchCheckEmail = async () => {
    setLoading(true);
    const response = await axios(`https://api.coincap.io/v2/assets`).catch((err) =>
    console.log(err)
    );
    // console.log(response.data.data)
    if(response){
          const data = response.data.data.map((item,i) => { 
          const { rank ,name, priceUsd ,marketCapUsd,vwap24Hr, supply, volumeUsd24Hr,changePercent24Hr } = item ;
          return {
            rank,
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
        setLoading(false);
    }
  };
  useEffect(() => {
    fetchCheckEmail();
  }, [setCheckEmail]);


  const columns = {
    rank: {
      title: "Rank",
    },
    name: {
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
    },
  };

  const memoizedColumns = useMemo(() => columns, []);
  if (loading) {
    return <Loading center primary xl isLoading={true} />;
  }
  return (
    <>
      <div className="center  flex flex-column container">
        <Table
          columns={memoizedColumns}
          data={config.empty ? [] : checkEmail}
          sortable={config.sortable}
          searchable={config.searchable}
          filterable={config.filterable}
          selectable={!config.selectable}
          paginate={!config.scrollable}
          limit={50}
          scrollable={config.scrollable ? "500px" : false}
          fixed={!config.fixed}
          loading={config.loading}
          expandable={config.expandable}
          onExpand={(row, i) => <span>Oh, You expanded me #{i}</span>}
          actionHidden
          selected={!selected}
          // onSelectChange={(rows, selected) => {
          //   // console.log(rows);
          //   // setCsvSelected(rows);
          //   setSelected(selected);
          // }}
          // onRowClick={(row, i) => {
          //   const rowIndex = row.__ez__.index,
          //     isNotSelected = selected.indexOf(rowIndex) === -1;

          //   const updateSelectedDemo = isNotSelected
          //     ? [...selected, rowIndex]
          //     : [
          //         ...selected.slice(0, selected.indexOf(rowIndex)),
          //         ...selected.slice(
          //           selected.indexOf(rowIndex) + 1,
          //           selected.length
          //         ),
          //       ];

          //   return setSelected(updateSelectedDemo);
 
          // }}
          // onAction={(row, i, isBulk) => {
          //   if (!isBulk)
          //     return <Button sm simple icon="more-h" className="icon-bold" />;
          //   // return (

          //   // );
          // }}
          onMobile={(row, i) => (
            <div className="pt-30 pb-30 m-auto">
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
    </>
  )
}


