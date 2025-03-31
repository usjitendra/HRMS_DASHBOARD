import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './rtk/store';


// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>
    <ThemeCustomization>
       <Toaster/>
       
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
    </Provider>
  );
}
