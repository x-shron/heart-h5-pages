import React from 'react'
import { Button, Result } from 'antd-mobile'
import { SmileOutline } from 'antd-mobile-icons'

export default (props: any) => {
  return (
    <>
    <Result
            style={{marginTop: '200px'}}
          status='success'
          icon={<SmileOutline />}
          title={undefined}
          {...props}
        />
    </>

  )
}
