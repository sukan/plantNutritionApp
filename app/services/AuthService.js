import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class AuthService {
  api: ApiServiceInterface;

  endpoint: string = "/auth";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  login(payload: Object) {
    return this.api.post(`${this.endpoint}/login`, payload);
  }

  register(payload: Object) {
    return this.api.post(`${this.endpoint}/register`, payload);
  }

  getUserData() {
    return this.api.get(`${this.endpoint}/userData`);
  }

  updateUser(payload: Object) {
    return this.api.put(`${this.endpoint}/profile`, payload);
  }

  getHeartRateFromBT() {
    return this.api.get(`${this.endpoint}/userData`);
  }
}

export default AuthService;
