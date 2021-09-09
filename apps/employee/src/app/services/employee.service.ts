import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const BASE_URL = `http://dummy.restapiexample.com/api/v1`;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  listEmployees() {
    return this.httpClient
      .get<{ status: string; data: unknown[] }>(`${BASE_URL}/employees`)
      .pipe(
        map((resp) =>
          resp.data.map((d) => {
            const {
              id,
              employee_name: name,
              employee_salary: salary,
              employee_age: age,
              profile_image: imageUrl,
            } = d as EmployeeAPIFormat;

            return { id, name, salary, age, imageUrl } as Employee;
          }),
        ),
      );
  }

  getEmployee(id: number) {
    return this.httpClient.get<APIResponse>(`${BASE_URL}/employee/${id}`).pipe(
      map((resp) => {
        const {
          id,
          employee_name: name,
          employee_salary: salary,
          employee_age: age,
          profile_image: imageUrl,
        } = resp.data as EmployeeAPIFormat;

        return { id, name, salary, age, imageUrl } as Employee;
      }),
    );
  }

  createEmployee(employee: Employee) {
    const { salary, age } = employee;
    const headers = new HttpHeaders();

    headers.set('content-type', 'application/json');

    return this.httpClient.post<APIResponse>(
      `${BASE_URL}/create`,
      {
        ...employee,
        salary: salary.toString(),
        age: age.toString(),
      },
      { headers },
    );
  }

  updateEmployee(id: number, employee: Employee) {
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');

    return this.httpClient.put<APIResponse>(
      `${BASE_URL}/update/${id}`,
      employee,
      { headers },
    );
  }

  removeEmployee(id: number) {
    return this.httpClient.delete<APIResponse>(`${BASE_URL}/delete/${id}`);
  }
}

interface APIResponse {
  status: string;
  data: unknown;
  message: string;
}

interface EmployeeAPIFormat {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
}

export interface Employee {
  id: number;
  name: string;
  salary: number;
  age: number;
  imageUrl: string;
}
