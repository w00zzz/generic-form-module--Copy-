import { ComponentType, StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a container element for the app
const container = document.createElement('div');
container.id = 'app-container';
document.body.appendChild(container);

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </RecoilRoot>
      </BrowserRouter>
    </StrictMode>
  );
}

export default render;
