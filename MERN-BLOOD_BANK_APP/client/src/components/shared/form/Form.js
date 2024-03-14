import React, { useState } from 'react'
import InputType from './InputType'
import {Link} from 'react-router-dom'
import { handleLogin, handleRegister } from '../../../services/authServices';


const Form = ({formType,submitBtn,formTitle}) => {
     const [email,setEmail] =useState("");
     const [password,setPassword] = useState("");
     const [role,setRole] = useState("");
     const [name,setName] = useState("");
     const [organisationName,setOrganisationName] = useState("");
     const [hospitalName,setHospitalName] = useState("");
     const [website,setWebsite] = useState("");
     const [address,setAddress] = useState("");
     const [phone,setPhone] = useState("");
  return (
    <div>
      <form onSubmit={(e) =>{
        if(formType === 'login') return handleLogin(e,email,password,role);
        else if(formType === 'register') return handleRegister(e,name,role,email,password,organisationName,address,phone,website,hospitalName);
      }}>
         <h1 className="text-center">{formTitle}</h1>
          <hr/>
          <div className="d-flex mb-3">
             <div className="form-check">
                <input type="radio" className="form-check-input" name="role" id="donarRadio" value={'donar'} onChange={(e) => setRole(e.target.value)} defaultChecked/>
                <label htmlfor="donarRadio" className="form-check-label">
                   donar
                </label>

             </div>
             <div className="form-check ms-2">
                <input type="radio" className="form-check-input" name="role" id="adminRadio" value={'Admin'} onChange={(e) => setRole(e.target.value)} />
                <label htmlfor="adminRadio" className="form-check-label">
                   Admin
                </label>

             </div>
             <div className="form-check ms-2">
                <input type="radio" className="form-check-input" name="role" id="HospitalRadio" value={"Hospital"} onChange={(e) => setRole(e.target.value)} />
                <label htmlfor="HospitalRadio" className="form-check-label">
                   Hospital
                </label>
            </div>
            <div className="form-check ms-2">
                <input type="radio" className="form-check-input" name="role" id="OrganisationRadio" value={"Organisation"} onChange={(e) => setRole(e.target.value)} />
                <label htmlfor="OrganisationRadio" className="form-check-label">
                   Organisation
                </label>
            </div>
          </div>

          {(() =>{
            //eslint-disable-next-line
             switch(true) {
              case formType === 'login':{
                return(
                  <>
                      <InputType labelText={"email"} labelFor={"forEmail"} InputType={"email"} name={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                      <InputType labelText={"Password"} labelFor={"forPassword"} InputType={"password"} name={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </>
                );
              }
                case formType=== 'register':{
                   return(
                     <>
                        {(role === 'Admin' || role === 'donar') &&(
                           <InputType labelText={"Name"} labelFor={"forName"} InputType={"text"} name={"name"} value={name} onChange={(e) => setName(e.target.value)}/>
                        )}
                        {role==='Organisation'&&(
                          <InputType labelText={"Organisation Name"} labelFor={"fororganisationName"} InputType={"text"} name={"organisationName"} value={organisationName} onChange={(e) => setOrganisationName(e.target.value)}/>
                        )}
                        {role==='Hospital'&&(
                           <InputType labelText={"Hospital Name"} labelFor={"forHospitalName"} InputType={"text"} name={"hospitalName"} value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}/>
                        )}
                        <InputType labelText={"email"} labelFor={"forEmail"} InputType={"email"} name={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <InputType labelText={"Password"} labelFor={"forPassword"} InputType={"password"} name={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <InputType labelText={"website"} labelFor={"forWebsite"} InputType={"text"} name={"website"} value={website} onChange={(e) => setWebsite(e.target.value)}/>
                        <InputType labelText={"Address"} labelFor={"forAddress"} InputType={"text"} name={"address"} value={address} onChange={(e) => setAddress(e.target.value)}/>
                        <InputType labelText={"Phone"} labelFor={"forPhone"} InputType={"text"} name={"phone"} value={phone} onChange={(e) => setPhone(e.target.value)}/>
                     </>
                   )
                }
             }
          })()}
           <div classsName="d-flex  d-flex justify-content-between">
              {formType === 'Login' ?(
                 <p>Not registered yet ? register
                  <Link to='/register'>Here !</Link>
                 </p>
              ) :(
               <p>Already User Please
                  <Link to='/login'>Login !</Link>
                 </p>
              )}
               <button className='btn btn-primary' type='submit'>
                  {submitBtn}
               </button>

           </div>
      </form>
    </div>
  );
};

export default Form
