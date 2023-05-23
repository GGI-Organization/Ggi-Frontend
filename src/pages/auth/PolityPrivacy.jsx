import React from 'react'

const PolityPrivacy = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <object
        data={require('../../utils/polity.pdf')}
        type='application/pdf'
        width='100%'
        height='100%'
      ></object>
    </div>
  )
}

export default PolityPrivacy