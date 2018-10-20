import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getItemsFromFakeXHR, addItemToFakeXHR, deleteItemByIdFromFakeXHR, editItemByIdFromFakeXHR } from './server/db/inventory.db';
import { getAllItems, addItem } from './actions/actions';
import AddTask from './AddTask';
import TODO from './01_ToDo';
import DOING from './02_Doing';
import DONE from './03_Done';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.editItemById = this.editItemById.bind(this);
    this.updateStateFromDb = this.updateStateFromDb.bind(this);
    this.deleteItemById = this.deleteItemById.bind(this);
  }

  //keep this
  componentDidMount() {
    this.props.getAllItems()
  }

  updateStateFromDb() {
    getItemsFromFakeXHR()
      .then( items => {
        this.setState({items}, () => {
        console.log('this.state', this.state)
      })
    })
  }

  getItemById(itemId) {
    getItemsFromFakeXHR(itemId)
    .then( result => {
    })
  }

  editItemById(itemId) {
    editItemByIdFromFakeXHR(itemId)
    .then( items => {
      this.setState( { items } )
      console.log('UPDATED');
    })
  }

  deleteItemById(itemId) {
    deleteItemByIdFromFakeXHR(itemId)
    .then( result => {
      this.updateStateFromDb()
    })
  }

  render() {
    const { items } = this.props
    return (
      <div id='kanban'>
      <div id='tasks'>
            <div className='taskCol'>
              <h1>THINGS TO DO</h1>
              <TODO updateDB={this.updateStateFromDb} deleteItemById={this.deleteItemById}items={this.props.items}/>
            </div>
            <div className='taskCol'>
              <h1>DOING</h1>
              <DOING updateDB={this.updateStateFromDb} deleteItemById={this.deleteItemById} items={this.props.items}/>
            </div>
            <div className='taskCol'>
              <h1>DONE</h1>
              <DONE updateDB={this.updateStateFromDb} deleteItemById={this.deleteItemById} items={this.props.items}/>
            </div>
        </div>
        <br/>
        <AddTask addItem={this.addItem} items={this.props.items}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state
  }
}

export default connect(mapStateToProps, { getAllItems, addItem })(App);