import React from 'react'
import { Result } from 'antd-mobile'
import { SmileOutline } from 'antd-mobile-icons'

export default () => {
  return (
    <Result
            style={{marginTop: '100px'}}
          status='success'
          icon={<SmileOutline />}
          title={undefined}
        />
  )
}
