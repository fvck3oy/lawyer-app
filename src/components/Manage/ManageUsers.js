
import React, { Component } from 'react'
import { Table, Input, Button, Popconfirm, Form, Tag, Icon, notification } from 'antd';
import axios, { post } from 'axios'
import url from '../../url_config'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}

export default class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'No.',
        dataIndex: 'key',
        key: 'key',
        render: text =>
          <a><Tag color="geekblue">{text}</Tag></a>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        editable: true,
        render: text =>
          <a><Tag color="orange">{text}</Tag> <Icon type="edit" style={{ color: 'red' }} /></a>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Tel',
        dataIndex: 'tel',
        key: 'tel',
      },
      {
        title: '',
        dataIndex: '',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Confirm to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <Icon type="delete"  style={{ color: 'red' }}/>
            </Popconfirm>
          ) : null,
      },
    ];

    // this.state = {
    //   dataSource: [
    //     {
    //       key: '0',
    //       name: 'Edward King 0',
    //       age: '32',
    //       address: 'London, Park Lane no. 0',
    //     },
    //     {
    //       key: '1',
    //       name: 'Edward King 1',
    //       age: '32',
    //       address: 'London, Park Lane no. 1',
    //     },
    //   ],
    //   count: 2,
    // };
  }
  state = {
    dataSource: [],
  }
  componentDidMount = () => {
    this.getUsers()
  }


  getUsers = e => {
    axios.get(`${url}/users/allUsers`).then(async res => {
      const { data } = res
      console.log(res);
      await this.setState({
        dataSource: data.map(e => {
          return {
            key: e.id,
            name: e.firstname + ' ' + e.lastname,
            level: e.level_post,
            email: e.email,
            tel: '0' + e.tel,
          }
        })
      });
      console.log("DataUsers : ", this.state.dataSource);
    })
  }

  
  updateLevel = data => {
    console.log("Data income : ", data);
    let body = {
      key: data.key,
      level: data.level
    }
    axios.put(`${url}/users/updateLevel`, body).then( res => {
      const { data } = res
      console.log('updated level : ', res);
      if (res.data.message === true){
        console.log('ok');
        this.openNotificationWithIcon('success',data.data.userName,data.data.userLevel)
      }else{
        console.log('else');
        this.openNotificationWithIcon('error')
      }
      //   await this.setState({
      //     dataSource: data.map(e => {
      //       return {
      //         key: e.id,
      //         name: e.firstname + ' ' + e.lastname,
      //         level: e.level_post,
      //         email: e.email,
      //         tel: '0' + e.tel,
      //       }
      //     })
      //   });
      //   console.log("DataUsers : ", this.state.dataSource);
      // })
    })
  }
  openNotificationWithIcon = (type,userName,userLevel) => {
    console.log(type);
    
   if (type == 'success'){
     notification[type]({
       message: 'Updated !',
       description:
         `Update level user ( ${userName} ) to level ${userLevel}`,
     });
   }else{
    notification[type]({
      message: 'Error',
      description:
        'Error can not update.',
    });
   }

};

  deleteUser = data => {
    console.log("Delete Id : ", data);
    axios.delete(`${url}/users/${data}`).then( res => {
      const { data } = res
      console.log('delete : ', res);

      if (res.data.message === true){
        console.log('ok');
        this.deleteOpenNotificationWithIcon('success',data.data.userName)
      }else{
        console.log('else');
        this.deleteOpenNotificationWithIcon('error')
      }
    })
  }

  deleteOpenNotificationWithIcon = (type,userName) => {
   if (type == 'success'){
     notification[type]({
       message: 'Deleted !',
       description:
         `Deleted user ( ${userName} )`,
     });
   }else{
    notification[type]({
      message: 'Error',
      description:
        'Error can not delete.',
    });
   }

};

  handleDelete = key => {
    console.log("Key Del : ", key);
    this.deleteUser(key)
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  // handleAdd = () => {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // };

  handleSave = row => {
    console.log("save ", row);
    this.updateLevel(row)
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button> */}
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          className="table-responsive"
        />
      </div>
    );
  }
}