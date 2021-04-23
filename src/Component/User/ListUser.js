import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from './userServices'
import userServices from './userServices';


function User() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowForDelete, setModalShowForDelete] = React.useState(false);
    const [modalShowForView, setmodalShowForView] = React.useState(false);
    const [SelectUserData, setSelectUserData] = React.useState();

    const [allEmployees, setallEmployees] = useState([]);
    const [userData, setuserData] = useState({
        id: "",
        full_name: '',
        email: '',
        mobile: '',
    })
    const [resetData, setresetData] = useState({
        id: "",
        full_name: '',
        email: '',
        mobile: '',
    })
    // const userApiCall=new UserService();

    // Api Call Start For Get All List User
    useEffect(() => {
        UserService.getUsers().then(result => {
            setallEmployees(result.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    // Api Call End For Get All List User

    function handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        setuserData(userData => ({
            ...userData,
            [name]: value,
        }))
    }

    function saveOrUpdateEmployee() {
        var data = userData;
        if (data.id) {
            UserService.updateEmployee(data).then(result => {
                alert("User Updated Succesfully");
                var pushData = result.data;
                updateDataTableAfterEdit(pushData);
            }).catch(err => {
                console.log(err);
            })
        } else {
            UserService.createEmployee(data).then(result => {
                alert("User Added Succesfully");
                var pushData = result.data;
                UpdateDataTable(pushData);
            }).catch(err => {
                console.log(err);
            })
        }

    }


    function updateDataTableAfterEdit(pushData) {
        var data = allEmployees;
        let new_array = data.map((item) => item.id === pushData.id ? pushData : item)
        setallEmployees(new_array);
        setModalShow(false);

    }


    function UpdateDataTable(data) {
        setallEmployees([...allEmployees, data])
        setModalShow(false);
    }


    function AddUserButtonClick() {
        setuserData(resetData);
        setModalShow(true);
    }





    function UserAddUpdate(props) {
        return (
            <Modal
                {...props}
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Employee
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <br></br>
                        <div className="container">
                            <div className="row">
                                <div className="card col-md-12">
                                    {
                                        getTitle()
                                    }
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label> Full Name: </label>
                                                <input placeholder="Full Name" className="form-control" name="full_name" onChange={(e) => handleChange(e)} value={userData.full_name}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Email Id: </label>
                                                <input placeholder="Email Address" className="form-control" name="email" value={userData.email} onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Mobile: </label>
                                                <input placeholder="Mobile Number" className="form-control" name="mobile" value={userData.mobile} onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" type="button" onClick={saveOrUpdateEmployee}>Save</button>
                    <button className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancel</button>
                </Modal.Footer>
            </Modal>


        )
    }

    function editEmployeeButtonClick(data) {
        setuserData(data);
        setModalShow(true);
    }




    function DeleteUserModalPopUp(props) {
        return (
            <Modal
                {...props}
                show={modalShowForDelete}
                onHide={() => setModalShowForDelete(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Employee
</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are You Sure Want to Delete {modalShowForDelete ? SelectUserData.full_name : ""} details.

            </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={deleteUserButtonClick}>Yes</button>
                    <button className="btn btn-danger" style={{ marginLeft: "10px" }}>No</button>
                </Modal.Footer>
            </Modal>)


    }



    function ViewUserModalPopUp(props) {
        return (
            <Modal
                {...props}
                show={modalShowForView}
                onHide={() => setmodalShowForView(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        View User
        </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={12} md={4}>
                                <div>User Full Name :</div>
                            </Col>
                            <Col xs={6} md={8}>
                                <label>{modalShowForView ? SelectUserData.full_name : ""}</label>
                            </Col>
                            <Col xs={12} md={4}>
                                <div>Email Address :</div>
                            </Col>
                            <Col xs={6} md={8}>
                                <label>{modalShowForView ? SelectUserData.email : ""}</label>
                            </Col>
                            <Col xs={12} md={4}>
                                <div>Mobile Number :</div>
                            </Col>
                            <Col xs={6} md={8}>
                                <label>{modalShowForView ? SelectUserData.mobile : ""}</label>
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>)


    }


    function UserDeleteButtonClick(data) {
        setSelectUserData(data);
        setModalShowForDelete(true);

    }

    function deleteUserButtonClick() {
        var userId = SelectUserData.id
        userServices.deleteEmployee(userId).then(result => {
            alert("User deleted");
            UpdateTableAfterDeleteUser(userId)
        }).catch(err => {
            console.log(err);
        })

    }

    function UpdateTableAfterDeleteUser(userId) {
        var filterData = allEmployees.filter(item => item.id !== userId)
        setallEmployees(filterData);
        setModalShowForDelete(false);
    }

    function viewEmployee(data) {
        setSelectUserData(data);
        setmodalShowForView(true);
    }

    function getTitle() {

    }



    function AddEmployee() {

    }






    return (


        <div style={{ padding: 20 }}>

            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={() => AddUserButtonClick()}> Add Employee</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th> Full Name</th>
                            <th> Email Id</th>
                            <th> Mobile Number</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allEmployees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td> {employee.full_name} </td>
                                        <td> {employee.email}</td>
                                        <td> {employee.mobile}</td>
                                        <td>
                                            <button onClick={() => editEmployeeButtonClick(employee)} className="btn btn-info">Update </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => UserDeleteButtonClick(employee)} className="btn btn-danger">Delete </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewEmployee(employee)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
            {
                UserAddUpdate()}

            {
                DeleteUserModalPopUp()}

            {
                ViewUserModalPopUp()}


        </div>
    )
}

export default User;