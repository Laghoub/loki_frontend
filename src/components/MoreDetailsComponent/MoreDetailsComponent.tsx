import React, { FC, useEffect, useState } from 'react';
import { MoreDetailsComponentWrapper } from './MoreDetailsComponent.styled';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios'; // Importez Axios

interface MoreDetailsComponentProps {
   productDesc: String; 
 }
const MoreDetailsComponent: FC<MoreDetailsComponentProps> = ({ productDesc }) => {
   return(
 <MoreDetailsComponentWrapper>
       <section className="bg-light border-top py-4">
      <div className="container">
        <div className="row">
          <div >
            <div className="rounded-2 px-3 py-2">
              {/* Pills navs */}
              <ul className="nav nav-pills nav-justified mb-3  col-sm-3 col-lg-3" id="ex1" role="tablist">
                <li className="nav-item d-flex" role="presentation">
                  <span className="nav-link d-flex align-items-center justify-content-center w-100 active" id="ex1-tab-1" data-mdb-toggle="pill" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Specifications</span>
                </li>

              </ul>
              {/* Pills navs */}

              {/* Pills content */}
              <div className="tab-content" id="ex1-content">
                <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                  <p>
                  {productDesc}

                  </p>


                </div>

              </div>
              {/* Pills content */}
            </div>
          </div>
        </div>
      </div>
    </section>
 </MoreDetailsComponentWrapper>
);
   }

export default MoreDetailsComponent;
