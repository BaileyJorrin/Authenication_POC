import IControlPointApi from "../interfaces/IControlPointApi";
import BaseDataApi from "./BaseDataApi";

class ControlPointApi extends BaseDataApi implements IControlPointApi {
  constructor() {
    super("ControlPoints");
  }
}

export default ControlPointApi;