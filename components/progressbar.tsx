import * as React from 'react';

const ProgressBar = (props: {percentage: number}) => {
  const Parentdiv = {
    height: 6,
    width: '20%',
    backgroundColor: '#a7c4cd',
    borderRadius: 40,
    margin: 50
  }

  const Childdiv = {
    height: '100%',
    width: `${props.percentage * 100}%`,
    backgroundColor: "#7e9aa3",
    borderRadius: 40,
  }

  return (
    <div style={Parentdiv}>
      <div style={Childdiv} />
    </div>
  )
}

export default ProgressBar;