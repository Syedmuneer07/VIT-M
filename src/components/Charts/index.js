/* eslint-disable no-unused-vars */
import React from "react";
import { Line, Pie } from "@ant-design/charts";
function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transactions)=> transactions.type === "expense").map((transaction) => {
    return { tag: transaction.tag, amount: transaction.amount };
  });

//   let finalSpendingData = spendingData.reduce((acc, obj) => {
//     let key = obj.tag;
//     if (!acc[key]) {
//         acc[key] = { tag: obj.tag, amount: obj.amount };
//     }else{
//         acc[key].amount += obj.amount;
//     }
//     return acc;
//   }, {});

  let newSpending=[
    {tag: "food", amount: 0},
    {tag: "education", amount: 0},
    {tag: "office", amount: 0},
  ];

  spendingData.forEach((item)=>{
    if(item.tag === "food"){
      newSpending[0].amount += item.amount;
    }else if(item.tag === "education"){
      newSpending[1].amount += item.amount;
    }else if(item.tag === "office"){      
      newSpending[2].amount += item.amount;
    }
  });

  const config = {
    data: data,
    width: 800,
    height: 400,
    autoFit: true,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: spendingData,
    width: 800,
    height: 400,
    angleField: "amount",
    colorField: "tag",
  };
  let chart;
  let pieChart;
  return (
    <div className="charts-wrapper">
        <div>
            <h1>Your Analitics</h1>
            <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>

        <div>
            <h1>Your Spendings</h1>
            <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
        </div>
    </div>
  );
}
export default ChartComponent;
