import React from 'react'
import {Table} from 'antd';
import data from '../constants/data.json';
import {columns} from '../constants/columns'
import {UpCircleFilled,DownCircleFilled} from '@ant-design/icons'
const TableData = () => {
    const newData = data.map(obj=>{
        return{
            id : obj.id,
            name: obj.first_name + " " + obj.last_name ,
            email:obj.email,
            gender: obj.gender
        }
    })

    const customExpandIcon = props => {
      console.log('here', props)
      if (props.expanded) {
        return (
          <UpCircleFilled
            type='caret-right'
            onClick={e => props.onExpand(props.record)}
            style={{ cursor: 'pointer', fontSize: '24px' }}
          />
        )
      }
      return (
        <DownCircleFilled
          type='caret-right'
          onClick={e => props.onExpand(props.record)}
          style={{ cursor: 'pointer', fontSize: '24px' }}
        />
      )
    }

  return (

    <div>
        <Table columns={columns} dataSource={newData} rowKey={obj => obj.id}
        expandable = {{
          expandIcon : e => customExpandIcon(e),
          expandedRowRender : res => (
            <div style={{backgroundColor:'pink',height:'6rem'}}>{res.name}</div>
          ),
          fixed:'right',
        }}
       
        />
    </div>
  )
}

export default TableData