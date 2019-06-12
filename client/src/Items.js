import React, { Component } from 'react';
import ItemForm from './ItemForm';
import ItemUpdate from './ItemUpdate';

class Items extends Component {
    state = {
        items: [],
        single: null
    }
    componentDidMount(){
        this.showAll();
    }
    showAll(){
        fetch('http://localhost:8000/api/items')
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            this.setState({items: data})
        })
    }
    showSingle(e, id){
        e.preventDefault();
        fetch(`http://localhost:8000/api/items/${id}`)
        .then(res => res.json())
        .then(single => this.setState({single}))
    }
    createItem(e){
        console.log('create item')
        e.preventDefault();
        fetch('http://localhost:8000/api/items/create', {
            method: 'POST',
            body: JSON.stringify({name: e.target.name.value
                //, purchased: e.target.purchased.value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => {
            console.log(res);
            res.json()
        })
        .then(newItem => {
            console.log(newItem);
            this.setState({items: [...this.state.items,newItem]});
        })
        .catch(error => console.log('Error:', error));
    }
    updateItem(e, id){
        console.log('update item')
        e.preventDefault();
        fetch(`http://localhost:8000/api/items/${id}/update`, {
            method: 'POST',
            body: JSON.stringify({name: e.target.name.value
                //, purchased: e.target.purchased.value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
    }
    deleteItem(e, id){
        console.log('delete item')
        e.preventDefault();
        fetch(`http://localhost:8000/api/items/${id}/delete`, {
            method: 'POST',
            body: JSON.stringify({name: e.target.name.value
                //, purchased: e.target.purchased.value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
    }
    render(){
        return(
            <section>
                <ItemForm onSubmit={(e) => this.createItem(e)} />
                <h2>Items</h2>
                <ul>
                    {this.state.items.map(item => {
                        return <a href={item.id} onClick={(e) => this.showSingle(e, item.id)}>
                            <li>{item.name}</li>
                            {/* <li>{item.purchased}</li> */}
                            <ItemUpdate onSubmit={(e) => this.updateItem(e, item.id)} />
                            <button name='delete' onClick={(e) => this.deleteItem(e, item.id)}>Delete</button>
                        </a>
                     })}
                </ul>
                {this.state.single && <article>
                    <h1>{this.state.single.name}</h1>
                </article>}
            </section>
        )
    }
}

export default Items;