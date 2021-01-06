import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class VerificationService {
  api: ApiServiceInterface;

  endpoint: string = "/verification";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  createVerification(payload: Object = {}) {
    return this.api.post(`${this.endpoint}/save`, payload);
  }

  getVerificationsList(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-all-farmer`, query);
  }

  getVerification(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-single`, query);
  }
}

export default VerificationService;
