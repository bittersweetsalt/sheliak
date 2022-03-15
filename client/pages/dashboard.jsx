import { useState, useEffect } from 'react';
import { userService } from 'services';

export { Dashboard };

function Dashboard(){
    
    const [data_table, set_DataTable] = useState({})
    const [access_db, set_Access] = useState(false)

    // current url - will change to dynamic - further planning
    const url = `http://localhost:8080/nc/testing_ground_1_5xb5/v1/graphql`
    const query = `query { testing_1List { id mouse_companies } }`

    useEffect(() => {
        getDatabase();
    }, [])

    function getDatabase() {
        //try catch statement around here 
        try{
            userService.query_db(url, query)
            .then(response => {
                // console.log(JSON.parse(response));
                // console.log(response);
                // response = JSON.parse(JSON.parse(response));
                // console.log(response);
                set_DataTable(response);
                // check_status();
            })
        }
        catch (err) {
            console.log(err);
        }        
    }

    function check_status(props){
        console.log(data_table);
        set_Access(!access_db);
    }

    function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {    return <UserGreeting />;  }  return <GuestGreeting />;
    }

    function UserGreeting(props) {
        return <h1>Data Found!</h1>;
      }
      
      function GuestGreeting(props) {
        return <h1>Database Not loaded.</h1>;
      }

    function SetData(props){
        const isFilled = props.isFilled;
        if (isFilled) {    return <Show_data />;  }  return <No_Data />;
    }

    function Show_data(){
        console.log(typeof(data_table.data.testing_1List));
        return data_table.data.testing_1List.map(item =>(
            <div key = {item.data}>
            <li>{item.mouse_companies}</li>
            </div>
        ));
    }

    function No_Data(){
        return <div>No Data</div>
    }
    
    return(
        <div>
            <Greeting isLoggedIn={access_db} />
            <ol>
            <SetData isFilled={access_db}/>
            </ol>
            <button onClick={check_status}>
                Check DB status
            </button>
        </div>
    )
    
}