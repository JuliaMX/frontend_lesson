import React, { Component } from 'react';
import './App.css';


class App extends Component {


    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        name: null,
        age: 0

    };


    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }


    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }


    getDataFromDb = () => {
        fetch("/users")
            .then(data => data.json())
            .then(res => this.setState({ data: res.data }));
    };

    postDataToDB = (name, age) => {
        fetch("/users", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                age: age
            })
        }).then(function(response) {
            return response.json()
        }).then(function(body) {
            console.log(body);
        });
    };

  render() {
   const { data } = this.state;
    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="add name"
                    onChange={e => this.setState({name:  e.target.value })}
                /> <br/>
                <input
                    type="text"
                    placeholder="add age"
                    onChange={e => this.setState({ age: e.target.value })}
                />
                <button onClick={() => this.postDataToDB(this.state.name, this.state.age)}>
                    ADD
                </button>
            </div>
            {data.length <= 0 ? "NO DB ENTRIES YET" : data.map(dat => (
                <p style={{ padding: "10px" }} key={data.message}>
                    {/*<span style={{ color: "gray" }}> doc: </span> {dat.name} {dat.age} {dat.createdAt} <br />*/}
                    <span style={{ color: "gray" }}> id: </span> {dat._id} <br />
                    <span style={{ color: "gray" }}> name: </span> {dat.name} <br />
                    <span style={{ color: "gray" }}> age: </span> {dat.age} <br />
                </p>
            ))}
        </div>
    );
  }
}

export default App;