import React from 'react';
//import components
import ListItem from'./ListItem/ListItem';

const toDoList = (props) => {
    
    // console.log('[ToDoList.js] what to come as prop',props);
    
    //4.
    const listItems = props.passlist.map((item,index) =>{
        // console.log(index);
        return (<ListItem key={index} 
            todoText={item.text} 
            status={item.status}
            //3.
            checkBoxClicked = {() => {
                // console.log('[ToDoList.js] checkBoxClicked!!');
                props.checkboxChangeHappen(item,index)}}
            />);
    });
        
    return(
        <ul style={{overflowX: "hidden"}}>
            {listItems}            
        </ul>
    );
}

export default toDoList; 

/*
1.
{ While development used but keep it for syntax purpose
changed={() => {props.anyChange(item.status,index)}}
2.
<ListItem key={0} todoText="Once a fairy tail is guild full of wizards"/> 
3.
// checkBoxClicked={() => {
            //     console.log('[ToDoList.js] checkBoxClicked!!');
            //     checkBoxChangeHandler(item,index);
            // }} 
4.
// const checkBoxChangeHandler = (item, index) => {
    //     // console.log('[ToDolist.js] checkbox chnage handler fire');
    // //     //change status of passlist
    //     console.log(props.passlist); //this list automaticaly updated why no clue!!
    // }
*/
 