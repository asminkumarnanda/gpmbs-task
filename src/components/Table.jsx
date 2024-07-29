import React from 'react'

export default function Table({member,theads,currentPage,recordsPerPage}) {
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
  
    // Slice the data array based on the indices
    const memberToDisplay = member.slice(startIndex, endIndex);
  return (
    <>
        <div className="card-datatable table-responsive">
                    <table className="datatables-ajax table ">
                      <thead>
                        <tr>
                        {theads.map((thead, index) => (
                          <th key={index}>{thead}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                            {(memberToDisplay== null || memberToDisplay.length == 0 ||memberToDisplay == undefined)?
                               <tr>
                                <td colSpan="8" className="text-center">No Data Found</td>
                              </tr>
                            :
                            memberToDisplay.length !== 0 && memberToDisplay.map((row, index) => {
                              return (
                                  <tr key={index}>
                                      <td>{startIndex + index +1}</td>
                                      <td>{row.fullname}</td>
                                      <td>{row.dob}</td>
                                      <td>{row.profession}</td>
                                      <td>{row.address}</td>
                                  </tr>
                              );
                          })}
                      </tbody>
                    </table>
                  </div>
    </>
  )
}
