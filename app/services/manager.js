import {
  registerGlobalServices,
  serviceManager,
} from "../helpers/services/manager";
import NavigationService from "./NavigationService";
import StorageService from "./StorageService";
import AuthService from "./AuthService";
import RemedyService from "./RemedyService";
import VerificationService from "./VerificationService";

export const registerServices = (options) => {
  registerGlobalServices(options);

  serviceManager.register("NavigationService", () => {
    return new NavigationService();
  });

  serviceManager.register("StorageService", () => {
    return new StorageService();
  });

  serviceManager.register("AuthService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new AuthService(api);
  });

  serviceManager.register("RemedyService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new RemedyService(api);
  });

  serviceManager.register("VerificationService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new VerificationService(api);
  });
};

export { serviceManager };
