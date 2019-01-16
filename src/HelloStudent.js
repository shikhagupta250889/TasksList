import React from 'react';

export default function HelloStudent(props) {
  return <div>Hello {props.student.name} {props.student.lastName}</div>;
}
