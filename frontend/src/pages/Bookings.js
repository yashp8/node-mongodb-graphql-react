import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

export class Bookings extends Component {
  state = {
    isLoading: false,
    bookings: [],
  };

  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    this.fatchBooking();
  }

  // componentWillUnmount() {
  //   this.isActive = false;
  // }

  fatchBooking = () => {
    this.setState({ isLoading: true });
    let requestBody = {
      query: `
      query{
        bookings{
          _id
          createdAt
          event{
            _id
    	      title
            date
          } 
        }
      }
      `,
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Brearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        const bookings = resData.data.bookings;
        if (this.isActive) {
          this.setState({ bookings: bookings });
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <ul>
        {this.state.bookings.map((booking) => (
          <li>{booking.event.title}</li>
        ))}
      </ul>
    );
  }
}

export default Bookings;
