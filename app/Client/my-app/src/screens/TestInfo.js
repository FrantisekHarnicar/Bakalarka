import React from 'react';
import '../styles/StudentTeacher.css';

const TestInfo = (props) => {
  let questionArray = []
  for(let i = 1 ; i <= props.questionCount; i++) {
    questionArray.push(i)
  }
  console.log(props.currentQuestion)

  const question = questionArray.map((item) => {
    return (
      item - 1 != props.currentQuestion ?
      <li key={item}>{item}</li>
      : 
      <li 
        className='current--question' 
        key={item}
      >{item}</li>
    )
  })

  return (
      <ul className='info--list'>
        {question}
      </ul>
  )
}

export default TestInfo