import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import {pagePrivate, pageRoutes} from '~/routes'

import DefaultLayout from '~/Layout/DefaultLayout/DefaultLayout';
import { PrivateRouter } from '~/page/PrivateRouter/privateRouter';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {pageRoutes.map(function (route,index) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                        <route.component/>
                    </DefaultLayout>
                  }
                />
              )
            })
          }
          {pagePrivate.map(function (routes,index) {
              return (
                <Route
                  key={index}
                  path={routes.path}
                  element={
                    <DefaultLayout>
                      <PrivateRouter>
                        <routes.component/>
                      </PrivateRouter>
                    </DefaultLayout>
                  }
                />
              )
            })
          }
        </Routes>
    </BrowserRouter>
  );
}

export default App;
