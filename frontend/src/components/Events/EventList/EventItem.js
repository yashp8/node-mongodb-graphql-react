import React from 'react';
import './EventItem.css';

const EventItem = (props) => {
  return (
    <li key={props.eventId} id={props.eventId} className='events__list-item'>
      <div>
        <h2>{props.title}</h2>
        <h3>
          ${props.price} - {new Date(props.date).toLocaleDateString()}
        </h3>
      </div>
      <div>
        {props.userId !== props.creatorId ? (
          <button
            className='btn'
            onClick={props.onDetail.bind(this, props.eventId)}
          >
            View Detail
          </button>
        ) : (
          <p>You are the owner of event</p>
        )}
      </div>
    </li>
  );
};

export default EventItem;
