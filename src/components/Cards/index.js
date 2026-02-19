import React from 'react'
import "./styles.css"
import {Card, Row } from "antd";
import Button from '../Button';
function Cards( {income, expense, totalBalance, showExpenseModal, showIncomeModal} ) {
    
  return (
    <Row className='my-row'>
        <Card className='my-card' >
            <h2>Current Balance</h2>
            <p>₹{totalBalance}</p> 
            <Button text="Reset Balance" blue={true}/>
        </Card>
        <Card  className='my-card' >
            <h2>Total Income</h2>
            <p>₹{income}</p> 
            <Button text="Add Income" blue={true} onclick={showIncomeModal} disabled={false} />
        </Card>
        <Card className='my-card' >
            <h2>Total Expense</h2>
            <p>₹{expense}</p> 
            <Button text="Add Expense" blue={true} onclick={showExpenseModal} disabled={false}/>
        </Card>
    </Row>
  ) 
}

export default Cards