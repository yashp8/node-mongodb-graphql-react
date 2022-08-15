import React from 'react';
import EventItem from './EventItem';
import './EventList.css';

const EventList = (props) => {
  const events = props.events.map((event) => {
    return (
      <EventItem
        eventId={event._id}
        title={event.title}
        userId={props.authUserId}
        creatorId={event.creator._id}
        price={event.price}
        date={event.date}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className='events__list'>{events}</ul>;
};

export default EventList;
