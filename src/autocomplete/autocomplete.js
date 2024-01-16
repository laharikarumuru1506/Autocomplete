import React, { useState } from 'react';
import Users from '../usersData.json';
import './autocomplete.css';
import { MdCancel } from "react-icons/md";

function Autocomplete() {

  const usersData = Users.users;
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(usersData);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filteredOptions = usersData.filter(user =>
    user.firstName.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (optionSelected) => {
    const filteredList = filteredOptions.filter(option =>(option.id !== optionSelected.id))
    setFilteredOptions(filteredList);
    setSelectedOptions([...selectedOptions, optionSelected]);
    setInputValue('');
  };

  const handleClearSelection = (optionSelectedToClear) => {
    const optionsSelected = selectedOptions.filter(selectedOption =>(selectedOption.id !== optionSelectedToClear.id));
    setSelectedOptions(optionsSelected);
    setFilteredOptions([...filteredOptions,optionSelectedToClear]);
    setInputValue('');
  };

  const handleAllClearSelection = () => {
    setFilteredOptions(usersData);
    setSelectedOptions([]);
    setInputValue('');
  };

  return (
    <div>
      {selectedOptions.length>0 && (<div style={{display:'flex'}}>
          {
              selectedOptions.map(option =>
                <div style={{display:'flex'}} key ={option.id} className='chips'>
                  <img src={ option.image} alt={ option.firstName }/>
                  <p>{option.firstName}{option.lastName}</p>
                  <MdCancel className = 'clear' onClick={()=> handleClearSelection(option)}/>
                </div>
              )
          }
          <p onClick={handleAllClearSelection} style={{cursor:'pointer',color:'red'}}>Clear</p></div>)
      }
      <input type="text" className="search-box" placeholder='Search users' value={inputValue} onChange={handleInputChange}/>
      <ul>{ 
          filteredOptions.map(user =>
            <li key={user.id} className = "autocomplete" onMouseDown={() => handleOptionClick(user)}>
              <div style={{display:'flex'}}>
                <img src={ user.image} alt={ user.firstName } className="profile"/>
                <p>
                  <span>{user.firstName}{ user.lastName }</span>
                  <span style={{margin : "0px 10px", color:'grey' }}>{user.email}</span>
                </p>
              </div>
            </li>
          )
      }</ul>
    </div>
  );
}

export default Autocomplete;
