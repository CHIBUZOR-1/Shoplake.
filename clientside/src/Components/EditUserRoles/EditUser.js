import React from 'react'

const EditUser = ({ handleUpdate, value, setValue}) => {
  return (
    <div className='form-back'>
        <form className='user_form' onSubmit={handleUpdate}>
            <div>
                <p>Change Role</p>
                <select value={value} onChange={(e)=> setValue(e.target.value)} name='newAdmin'>
                    <option value="ADMIN">ADMIN</option>
                    <option value="GENERAL">GENERAL</option>
                </select>
            </div>
            <button type='submit'>UPDATE</button>
        </form>
    </div>
  )
}

export default EditUser