import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import BookingList from '../components/Bookings/BookingList';

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

  deleteBookingHandler = (bookingId) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation {
            cancelBooking(bookingId: "${bookingId}") {
            _id
             title
            }
          }
        `,
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

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
      <BookingList
        bookings={this.state.bookings}
        onDelete={this.deleteBookingHandler}
      />
    );
  }
}

export default Bookings;
