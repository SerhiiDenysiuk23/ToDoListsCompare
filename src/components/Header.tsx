import React, {useEffect, useState} from 'react';
import {request} from "../api/core";


const getCurrentDB = `
query CurrentDB{
  currentDB
}
`
const changeDB = `
mutation ChangeFlag($dbSwitchFlag: String){
  changeDB(dbSwitchFlag: $dbSwitchFlag)
}
`

const dbList: string[] = ["SQL","XML"]

const Header = () => {
    const [currentDB, setCurrentDB] = useState<string>(dbList[0])

    useEffect(()=>{
        request(getCurrentDB).then(r => setCurrentDB(r.data.currentDB))
    },[])


    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        request(changeDB, {dbSwitchFlag: currentDB}).then(r => {
            console.log(r)
            setCurrentDB(r.data.changeDB)
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDB(e.target.value);
    }

    // console.log(currentDB)

    return (
        <header className="header">
            <nav>
                <ul>
                    <li><a href="/">ToDo</a></li>
                    <li><a href="/categories">Category</a></li>
                </ul>
            </nav>

            <form className="db-switch" onSubmit={handleFormSubmit}>
                <select onChange={handleSelectChange}>
                    {
                        dbList.map(item => <option selected={currentDB == item} key={item} value={item}>{item}</option>)
                    }
                </select>
                <button type="submit">Change DB</button>
            </form>
        </header>
    );
};

export default Header;