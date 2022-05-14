import { useEffect, useState } from 'react';

const url = 'https://application-demo.tjuqxb.repl.co';
const url0 = 'http://localhost:8080';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: '5px',
};

const inputStyle = {
  margin: '2px',
};

const DisplayItems = (props) => {
  const [items, setItems] = useState([]);
  const [records, setRecords] = useState([]);
  const [addItemName, setaddItemName] = useState('');
  const [addItemQuantity, setAddItemQuantity] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [editItemName, setEditItemName] = useState('');
  const [editItemQuantity, setEditItemQuantity] = useState('');
  const [deleteItemId, setDeleteItemId] = useState('');
  const [comment, setComment] = useState('');
  const [trigger0, setTrigger0] = useState(false);
  const [trigger1, setTrigger1] = useState(false);

  const triggerUpdateItems = () => {
    setTrigger0(!trigger0);
  };

  const triggerUpdateRecords = () => {
    setTrigger1(!trigger1);
  };

  const getItems = () => {
    fetch(`${url}/items/list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
      });
  };

  const getRecords = () => {
    fetch(`${url}/records/list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRecords(data);
      });
  };

  useEffect(getItems, [trigger0]);

  useEffect(getRecords, [trigger1]);

  const addItem = () => {
    const item = {
      name: addItemName,
      quantity: addItemQuantity,
    };
    fetch(`${url}/items/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      body: JSON.stringify(item),
    }).then((res) => {
      if (res.ok) {
        alert('success');
        triggerUpdateItems();
      } else {
        alert('fail');
      }
    });
  };

  const editItem = () => {
    const item = {
      item_id: editItemId,
      name: editItemName,
      quantity: editItemQuantity,
      is_deleted: false,
    };
    fetch(`${url}/items/edit`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      body: JSON.stringify(item),
    }).then((res) => {
      if (res.ok) {
        alert('success');
        triggerUpdateItems();
      } else {
        alert('fail');
      }
    });
  };

  const deleteItem = () => {
    const deleteReocrd = {
      item_id: deleteItemId,
      comment: comment,
    };
    fetch(`${url}/items/delete`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      body: JSON.stringify(deleteReocrd),
    }).then((res) => {
      if (res.ok) {
        alert('success');
        triggerUpdateItems();
        triggerUpdateRecords();
      } else {
        alert('fail');
      }
    });
  };

  const cancelDeletion = (rec_id) => {
    fetch(`${url}/records/cancel/${rec_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    }).then((res) => {
      if (res.ok) {
        alert('success');
        triggerUpdateItems();
        triggerUpdateRecords();
      } else {
        alert('fail');
      }
    });
  };

  return (
    <div
      style={{
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={rowStyle}>
        <div></div>
        <table border="1">
          <thead>
            <tr>
              <th>item_id</th>
              <th>name</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={item.item_id}>
                  <td>{item.item_id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div></div>
      </div>
      <div style={rowStyle}>
        <div>Add Item: </div>

        <input
          style={inputStyle}
          type="text"
          placeholder="item name"
          value={addItemName}
          name="addItemName"
          onChange={(e) => {
            setaddItemName(e.target.value);
          }}
        />

        <input
          style={inputStyle}
          placeholder="item quantity"
          type="number"
          min="1"
          value={addItemQuantity}
          name="addItemQuantity"
          onChange={(e) => {
            setAddItemQuantity(e.target.value);
          }}
        />
        <button
          name="submit"
          onClick={() => {
            addItem();
          }}
        >
          submit
        </button>
      </div>
      <div style={rowStyle}>
        <div>Edit Item: </div>
        <input
          style={inputStyle}
          type="number"
          placeholder="item id"
          value={editItemId}
          name="editItemId"
          onChange={(e) => {
            setEditItemId(e.target.value);
          }}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="item name"
          value={editItemName}
          name="editItemName"
          onChange={(e) => {
            setEditItemName(e.target.value);
          }}
        />

        <input
          style={inputStyle}
          placeholder="item quantity"
          type="number"
          min="1"
          value={editItemQuantity}
          name="editItemQuantity"
          onChange={(e) => {
            setEditItemQuantity(e.target.value);
          }}
        />
        <button
          name="submit"
          onClick={() => {
            editItem();
          }}
        >
          submit
        </button>
      </div>
      <div style={rowStyle}>
        <div>Delete Item: </div>
        <input
          style={inputStyle}
          type="number"
          placeholder="item id"
          value={deleteItemId}
          name="deleteItemId"
          onChange={(e) => {
            setDeleteItemId(e.target.value);
          }}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="comment"
          value={comment}
          name="comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          name="submit"
          onClick={() => {
            deleteItem();
          }}
        >
          submit
        </button>
      </div>
      <div style={{ ...rowStyle, margin: '10px' }}>
        <div></div>
        <table border="1">
          <thead>
            <tr>
              <th>delete_record_id</th>
              <th>item_id</th>
              <th>comment</th>
              <th>timestamp</th>
              <th>operation</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              return (
                <tr key={record.rec_id}>
                  <td>{record.rec_id}</td>
                  <td>{record.item_id}</td>
                  <td>{record.comment}</td>
                  <td>{new Date(record.timestamp).toLocaleString()}</td>
                  <td>
                    {record.is_cancelled ? null : (
                      <button
                        disabled={record.is_cancelled}
                        onClick={() => {
                          cancelDeletion(record.rec_id);
                        }}
                      >
                        cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div></div>
      </div>
    </div>
  );
};

export default DisplayItems;
