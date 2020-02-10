import React, { Component } from 'react'
import { Table, Input, Button, Popconfirm, Form, Tag, Icon, notification } from 'antd';
import axios, { post } from 'axios'
import url from '../../url_config'
import { Link } from 'react-router-dom'

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

export default class ManageLands extends React.Component {
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
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        // editable: true,
        render: text =>
          <a><Tag color="red">{text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} บาท</Tag></a>,
      },
      {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: 'Level',
        dataIndex: 'level',
        editable: true,
        key: 'level',
        render: text => <a><Tag color="orange">{text}</Tag> <Icon type="edit" style={{ color: 'red' }} /></a>,
      },
      {
        title: 'View',
        dataIndex: 'view',
        key: 'view',
      },
      {
        title: '',
        dataIndex: 'public',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (<div>
            {text == 1 && <Popconfirm title="Confirm to UnPublic?" onConfirm={() => this.handleUnPublic(record.key)}>
              <Icon type="close" style={{ color: 'green', marginRight: '5px', cursor: 'pointer' }} />
            </Popconfirm>}

            {text == 0 && <Popconfirm title="Confirm to Public?" onConfirm={() => this.handlePublic(record.key)}>
              <Icon type="check" style={{ color: 'green', marginRight: '5px', cursor: 'pointer' }} />
            </Popconfirm>}

            <Link to={`/saleLand/${record.key}`}>
              <Icon type="search" style={{ color: 'blue', marginRight: '5px', cursor: 'pointer' }} />
            </Link>


            <Popconfirm title="Confirm to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <Icon type="delete" style={{ color: 'red' }} />
            </Popconfirm>
          </div>
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
    this.getLands()
  }

  getLands = e => {
    axios.get(`${url}/lands/bof`).then(async res => {
      const { data } = res
      console.log(res);
      await this.setState({
        dataSource: data.map(e => {
          return {
            key: e.id,
            title: e.title,
            price: e.price,
            user: e.user,
            level: e.level,
            view: e.view,
            public: e.public,

          }
        })
      });
      console.log("DataUsers : ", this.state.dataSource);
    })
  }

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

  updateLevel = data => {
    console.log("Data income : ", data);
    let body = {
      key: data.key,
      level: data.level
    }
    axios.put(`${url}/lands/updateLevel`, body).then(res => {
      const { data } = res
      console.log('updated level : ', res);
      if (res.data.message === true) {
        console.log('ok');
        this.openNotificationWithIcon('success', data.data.landId, data.data.landLevel)
      } else {
        console.log('else');
        this.openNotificationWithIcon('error')
      }
    })
  }
  openNotificationWithIcon = (type, landId, landLevel) => {
    console.log(type);

    if (type == 'success') {
      notification[type]({
        message: `Update id ${landId} !`,
        description:
          `Update Level to ${landLevel}`,
      });
    } else {
      notification[type]({
        message: 'Error',
        description:
          'Error can not Update.',
      });
    }

  };
  toPublic = data => {
    console.log("Public Id : ", data);
    data = {
      id: data
    }
    axios.put(`${url}/lands/public`, data).then(res => {
      const { data } = res
      console.log('toPublic : ', res);

      if (res.data.message === true) {
        console.log('ok');
        this.toPublicNoti('success')
      } else {
        console.log('else');
        this.toPublicNoti('error')
      }
    }).then(this.getLands)
  }
  toPublicNoti = (type) => {
    console.log(type);

    if (type == 'success') {
      notification[type]({
        message: `Update!`,
        description:
          `Updated to Public`,
      });
    } else {
      notification[type]({
        message: 'Error',
        description:
          'Error can not Update.',
      });
    }
  };
  toUnPublic = data => {
    console.log("Public Id : ", data);
    data = {
      id: data
    }
    axios.put(`${url}/lands/unPublic`, data).then(res => {
      const { data } = res
      console.log('toUnPublic : ', res);

      if (res.data.message === true) {
        console.log('ok');
        this.toUnPublicNoti('success')
      } else {
        console.log('else');
        this.toUnPublicNoti('error')
      }
    }).then(this.getLands)
  }
  toUnPublicNoti = (type) => {
    console.log(type);

    if (type == 'success') {
      notification[type]({
        message: `Update!`,
        description:
          `Updated to UnPublic`,
      });
    } else {
      notification[type]({
        message: 'Error',
        description:
          'Error can not Update.',
      });
    }
  };

  deleteUser = data => {
    console.log("Delete Id : ", data);
    axios.delete(`${url}/lands/${data}`).then(res => {
      const { data } = res
      console.log('delete : ', res);

      if (res.data.message === true) {
        console.log('ok');
        this.deleteOpenNotificationWithIcon('success')
      } else {
        console.log('else');
        this.deleteOpenNotificationWithIcon('error')
      }
    })
  }

  handleGoto = e => {
    // this.props.history.push(`/createLand`)
    console.log("E : ", e);

    this.props.history.push(`/saleLand/${e}`)
  }

  deleteOpenNotificationWithIcon = (type, userName) => {
    if (type == 'success') {
      notification[type]({
        message: 'Deleted !',
        description:
          `Deleted`,
      });
    } else {
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

  handlePublic = key => {
    console.log("Key Pub : ", key);
    this.toPublic(key)
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleUnPublic = key => {
    console.log("Key UnPub : ", key);
    this.toUnPublic(key)
  }

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