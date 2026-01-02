function EditUserModal({ user, onClose }) {
    return (
      <div className="modal show d-block" style={{ background: "#00000080" }}>
        <div className="modal-dialog">
          <div className="modal-content">
  
            <div className="modal-header">
              <h5 className="modal-title">Edit User Details</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
  
            <div className="modal-body">
              <p><input type ="text" name="name" value={user.userName}/></p>
              <p><input type ="email" name="email" value={user.email}/></p>
              <p><input type ="password" name="password" value={user.password}/></p>
              <p><input type ="text" name="gender" value={user.gender}/></p>
              <p><input type ="text" name="address" value={user.address}/></p>
              <p><input type ="text" name="status" value= {user.isActive}/></p>   
                
                
              
              
            </div>
  
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default EditUserModal;
  