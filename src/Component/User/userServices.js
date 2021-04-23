import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://sangrampattnaik09.pythonanywhere.com/users/person/";

class UserService {

    getUsers(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        console.log(employee);
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    // getEmployeeById(employeeId){
    //     return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    // }

    updateEmployee(employee){
        var id=employee.id
        return axios.put(EMPLOYEE_API_BASE_URL + id + '/', employee );
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + employeeId + '/' );
    }
}

export default new UserService()