import './App.css'
import {users} from "./users.ts";
import { countByMfa, filterByDepartment, filterByMFA, groupBy, searchByName, sortByLastSignin, splitActiveInActive, topNBySignin, uniqueDepartment } from './usersutil.ts';

function App() {
  let filteredDepartment = filterByDepartment(users,"Engineering");
  filteredDepartment=filterByMFA(filteredDepartment,true)
  filteredDepartment=sortByLastSignin(filteredDepartment,'asc')
  filteredDepartment=searchByName(filteredDepartment,"a")
  // console.log(groupBy(users));
  // console.log(countByMfa(users));
  // console.log(uniqueDepartment(users));
  // filteredDepartment=topNBySignin(users,20);
  // console.log(splitActiveInActive(users))
  return (
    <>
      <div>
        <div>
          <input type="text" placeholder='search users' className="input-search" />
        </div>
        {filteredDepartment.map((user)=>(
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-details">
                  <div className="user-initial">{user.displayName[0]}</div>
                  <div className="user-info">
                    <div className="user-display-name">{user.displayName}</div>
                    <div className="user-meta">
                      <span className="user-department">{user.department}</span>
                      <span className="user-licenses">
                          {user.licenses.map((license)=>(
                            <span key={license}> | {license}</span>
                        ))}
                      </span>
                    </div>
                  </div>
              </div>
              <div className={user.mfaEnabled ? "mfa-enabled" : "mfa-disabled"}>
                {user.mfaEnabled ? "MFA Enabled" :"MFA Disabled"}
              </div>
            </div>
            <hr/>
            <div className="user-last-signin">last Signin:
              {user.lastSignin.toLocaleDateString("en-IN",{ 
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
