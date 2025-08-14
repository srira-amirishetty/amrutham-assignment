import { configureStore } from "@reduxjs/toolkit";

import RegisterUserReducer from "./Slice/RegisterSlice";
import LoginUserReducer from "./Slice/LoginSlice";
import DoctorRegisterReducer from "./Slice/DoctorRegisterSlice";
import DoctorLoginReducer from "./Slice/DoctorLogin"
import AppointmentReducer from "./Slice/Appointment"
import CategoryReducer from "./Slice/Category"
import DoctorsReducer from "./Slice/FetchDoctors"

export const store = configureStore({
  reducer: {
    RegisterAPI: RegisterUserReducer,
    LoginAPI: LoginUserReducer,
    DoctorRegisterAPI: DoctorRegisterReducer,
    DoctorLoginAPI: DoctorLoginReducer,
    AppointmentAPI: AppointmentReducer,
    CategoryAPI: CategoryReducer,
    DoctorsAPI: DoctorsReducer,
  },
});
