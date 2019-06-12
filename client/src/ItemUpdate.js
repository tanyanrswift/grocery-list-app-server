import React from 'react';

export default function ItemUpdate(props){
    return <form onSubmit={props.onSubmit}>
        <h2>Edit Item</h2>
        {/* <label>
            <input type="checkbox" name='purchased' checked />
        </label> */}
        {/* <select>
            <option value='purchased'>Mark as Purchased</option>
            <option selected value='unpurchased'>Mark as Unpurchased</option>
        </select> */}
        <div>
            <input type='text' name='name' placeholder='Enter New Item Name'/>
        </div>
        <div>
            <input type="submit" value="Submit" />
        </div>
    </form>
}