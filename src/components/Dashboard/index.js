import React from 'react';
import axios from 'axios';
import './index.css';

import Modal from '../Modal';
import Spinner from '../Spinner';

function Transaction(props) {

    console.log(props);
    
    return (
        <tr>
            <td className="btn-light" colSpan="3">{props.transaction.description} {props.transaction.amount}</td>
        </tr>
    );
}

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            User: {},
            dataLoaded: false,
            lendArr: [],
            borrowArr: []
        }

        this.addTransaction = this.addTransaction.bind(this);
    }

    componentDidMount() {

        try{
            var token = JSON.parse(localStorage.token);
        }catch(e) {
              console.log("Token APP err");  
        }
    
        
        if(token!==undefined) {
        
            axios.get('http://localhost:5000/user/verify/'+token)
            .then( response => {
                console.log(response);
                this.setState({User: response.data.user});
                this.axiosGetTransaction(response.data.user);
            })
            .catch( err => console.log('Token Err'));

            /** Transactions */
        } else {
            window.location = '/signin'
        }
    }

        axiosGetTransaction = (user)=> {
            let token = user._id;
            console.log('http://localhost:5000/transaction/'+token);
        
                Promise.all([
                axios.get('http://localhost:5000/transaction/lentTransactions/'+token),
                axios.get('http://localhost:5000/transaction/debtTransactions/'+token)])
                .then((res)=> {
                    console.log(res[0]);
                    console.log(res[1]);
                    this.setState({lendArr: res[0].data.transactions,borrowArr: res[1].data.transactions, dataLoaded: true});
                })
                .catch(err => console.log(err));
        }
    
        createLentTable = (array)=> {
        if(array && array.length>0) {
                return array.map( (current)=> {
                    return <Transaction transaction={current} key={current._id} /> 
                });
            }
        }

        createBorrowTable = (array)=> {
            if(array && array.length>0) {   
                return array.map( (current)=> {
                    return <Transaction transaction={current} key={current._id} /> 
                });
            }
        }

     addTransaction() {
        console.log("Transaction Added!");
        this.setState({dataLoaded: false});
        this.axiosGetTransaction(this.state.User);
     }

    render() {
        return (
            <div>
                {/* DASHBOARD HEAD */}

                <div className="row">
                    <div className="col-sm-6"><h3>All Payments.</h3></div>
                    <div className="col-sm-3"><button className="btn btn-warning text-white" data-toggle="modal" data-target="#Modal1">Add Debt</button></div>
                    <div className="col-sm-3"><button className="btn btn-success" data-toggle="modal" data-target="#Modal2">Pay Back</button></div>
                    <Modal id="Modal1" addTransaction={this.addTransaction} user={this.state.User} title="Add Debt" />
                    <Modal id="Modal2" addTransaction={this.addTransaction} user={this.state.User} title="Pay Back" />
                </div>
                <hr />

                <div className="row flex-row text-secondary">
                    <div className="col-sm-6 d-flex justify-content-center"><h5>You Pay</h5></div>
                    <div className="col-sm-6 d-flex justify-content-center"><h5>You Collect</h5></div>
                </div>
                <hr />

                {/* PAYMENTS TABLE */}

                <div className="row">
                            { !this.state.dataLoaded && <Spinner /> }  
                <div className="col-md-6">
                    <table className="table">
                        <tbody>
                            { this.state.dataLoaded && this.createBorrowTable(this.state.borrowArr)}
                        </tbody>
                    </table>                        
                </div>

                <div className="col-md-6">
                    <table className="table">
                        <tbody>
                            { this.state.dataLoaded && this.createLentTable(this.state.lendArr) }
                        </tbody>
                    </table>
                </div>

                </div>
            </div>
        )
    }
}


