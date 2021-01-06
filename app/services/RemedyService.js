import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class RemedyService {
  api: ApiServiceInterface;

  endpoint: string = "/research";
  publicIp: string = "3.139.86.169";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getRemedyType(payload: Object = {}) {
    return axios.post(
      `http://${this.publicIp}/eff-healthy-leaf/img-process`,
      payload
    );
  }

  getRemedyDetails(payload: Object = {}) {
    return axios.post(
      `http://${this.publicIp}/healthy-leaf/img-process`,
      payload
    );
  }

  getResearchDetails(query: Object = {}) {
    return this.api.get(`${this.endpoint}/get-research`, query);
  }
}

export default RemedyService;
