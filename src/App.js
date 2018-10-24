import React, { Component } from 'react';
import './App.css';

class App extends Component {


    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false
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


  render() {

   const { data } = this.state;

    return (

        <div>

            {data.length <= 0 ? "NO DB ENTRIES YET" : data.map(dat => (
                <p style={{ padding: "10px" }} key={data.message}>
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