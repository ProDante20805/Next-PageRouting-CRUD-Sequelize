import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, editUser, deleteUser } from '../store/usersSlice';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const loading = useSelector((state) => state.users.loading);
  const errorMessage = useSelector((state) => state.users.error);

  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(true);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e) => setValue(e.target.value);

  const handleAddUser = () => {
    if (value.trim()) {
      dispatch(addUser(value)).then(() => setValue(''));
    }
  };

  const handleEditUser = () => {
    if (value.trim()) {
      dispatch(editUser({ id, name: value })).then(() => {
        setValue('');
        setIsEdit(true);
      });
    }
  };

  const handleEdit = (userId, userName) => {
    setIsEdit(false);
    setId(userId);
    setValue(userName);
  };

  const handleDeleteUser = (userId) => dispatch(deleteUser(userId));

  const cancelEdit = () => {
    setIsEdit(true);
    setValue('');
  };

  return (
    <div className="mt-20">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder={isEdit ? 'Add a new name' : 'Edit the name'}
          className="input input-bordered w-full max-w-xs mr-5"
          onChange={handleInputChange}
          value={value}
        />
        <button className="btn btn-outline btn-info" onClick={isEdit ? handleAddUser : handleEditUser}>
          {isEdit ? 'Add' : 'Save'}
        </button>
        {!isEdit && (
          <button className="ml-2 btn btn-outline btn-warning btn-sm" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>
      <div className="m-auto max-w-lg">
        <table className="table">
          <thead>
            <tr>
              <th className="w-10">No</th>
              <th>Name</th>
              <th className="w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td className="flex">
                  <button className="btn btn-outline btn-success btn-xs" onClick={() => handleEdit(user.id, user.name)}>
                    Edit
                  </button>
                  <button className="ml-2 btn btn-outline btn-error btn-xs" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div>Loading...</div>}
      {errorMessage && <div>Error: {errorMessage}</div>}
    </div>
  );
}
