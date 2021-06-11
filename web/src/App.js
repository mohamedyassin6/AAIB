import './App.css';
import { Component } from "react";
import axios from "axios";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reports: [],
    }
  }

  componentDidMount() {
    this.fetchReports();
  }

  fetchReports = () => {

    const url = 'http://localhost:5000/reports';
    axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      const reports = response.data;
      this.setState({ reports });
    }).catch(error => {
      console.error(error)
      alert(error.message);
    });
  }

  onResolveTicket = item => {

    const url = 'http://localhost:5000/reports/'+item.id;
    axios.put(url, {
      ticketState: 'CLOSED'
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      alert(response.data);
      this.fetchReports();
    }).catch(error => {
      console.error(error)
      alert(error.message);
    });
  }

  onBlockContent = item => {

    const url = 'http://localhost:5000/reports/'+item.id;
    axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      alert(response.data);
      this.fetchReports();
    }).catch(error => {
      console.error(error)
      alert(error.message);
    });
  }

  capitalize = s => s && s[0].toUpperCase() + s.toLowerCase().slice(1)

  render() {

    const { reports } = this.state;

    return (
      <div className="App">
        <h1>Reports</h1>
        <div className="row">
          <div className="box">
            {reports.map((item, i) => (
              <div key={i} className="report row">
                <div className="head">
                  <div><p>Id: {item.id}</p></div>
                  <div><p>State: {this.capitalize(item.state)}</p></div>
                  <div><a>Details</a></div>
                </div>
                <div className="content">
                  <div><p>Type: {this.capitalize(item.payload.reportType)}</p></div>
                  <div><p>Message: {item.payload.message}</p></div>
                </div>
                <div className="buttons">
                  <input type='button'
                         value='Block'
                         className="block-btn"
                         onClick={() => this.onBlockContent(item)} />
                  <input type='button'
                         value='Resolve'
                         onClick={() => this.onResolveTicket(item)}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}


