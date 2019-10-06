import React from 'react';
import axios from 'axios';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            contact: 0,
            amount: 0,
            type: 'send',
            description: ''
        }
    
    }

    onChangeContact = (e)=> {
        this.setState({contact: e.target.value});
    }
    onChangeType = (e)=> {
        this.setState({type: e.target.value});
    }
    onChangeDescription = (e)=> {
        this.setState({description: e.target.value});
    }
    onChangeAmount = (e)=> {
        this.setState({amount: e.target.value});
    }
    onSubmit = (e)=> {
        e.preventDefault();

        var transaction = {contact: this.state.contact, description: this.state.description, amount: this.state.amount};
        if(transaction.contact === this.props.user.contact) alert("Cannot Send Money To yourself!");
        //Axios Request to save transaction::

        else if(this.state.type === "send")
        axios.post('http://localhost:5000/transaction/send/'+this.props.user._id, transaction)
        .then((response)=>{
            if(response.data.success === false) console.log("Not added");
            else {
                this.props.addTransaction(response);
                console.log("transaction added!", response);
            }

        })
        .catch(err => console.log(err));

        
        //Axios Request to save transaction::
        else   if(this.state.type === "recieve")
        axios.post('http://localhost:5000/transaction/recieve/'+this.props.user._id, transaction)
        .then((response)=>{
            if(response.data.success === false) console.log("Not added");
            else {console.log("transaction added!", response);}

            this.props.addTransaction(response);
        })
        .catch(err => console.log(err));

    }

    render() {
        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{this.props.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <form onSubmit={this.onSubmit}>

                    <div className="modal-body">
                            <div className="form-group col-md-4">
                                <label>Add expense with:</label> <input onChange={this.onChangeContact} type="number" required placeholder="5555333322"></input>
                            </div>
        
                            <div className="form-group col-md-4">
                                <label>Type:</label>
                                <select onChange={this.onChangeType} className="form-control">
                                    <option defaultValue value="send">Send</option>
                                    <option value="recieve">Recieve</option>
                                </select>
                            </div>    
            
                            <div className="form-group col-md-4">
                                <label>Description:</label> <textarea onChange={this.onChangeDescription} type="text"></textarea>
                            </div>

                            <div className="form-group col-md-4">
                                <label>Amount:</label> <input onChange={this.onChangeAmount} type="number" required></input>
                            </div>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" onClick={this.onSubmit} className="btn btn-primary" data-dismiss="modal">Add Transaction</button>
                    </div>

                  </form>


                </div>
              </div>
            </div>        
        );
    }

}