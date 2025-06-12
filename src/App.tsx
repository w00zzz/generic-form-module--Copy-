import { useEffect } from "react";
import { Profiler } from "react";

import TestPage from "./TestPage";
import GenericForm from "./components.form/form.generic";
import { RecoilRoot } from "recoil";
import { IGenericControls } from "./types/controls.types";

// Función para manejar los datos del Profiler con tipos correctos
const logRenderPerformance = (
  id: string,
  phase: "mount" | "update" | "nested-update",
  actualDuration: number,
  baseDuration: number
) => {
  console.group(`Profiler - ${id}`);
  console.log(`Fase: ${phase}`);
  console.log(`Duración real: ${actualDuration.toFixed(2)}ms`);
  console.log(`Duración base: ${baseDuration.toFixed(2)}ms`);
  console.groupEnd();
};

function App() {
  const controls: IGenericControls[] = [
    {
      type: "text",
      name: "username",
      label: "Username",
    },
    {
      type: "text",
      name: "password",
      label: "Password",
    },
  ];

  return (
    <Profiler id="GenericForm" onRender={logRenderPerformance}>
    <GenericForm
      name="naas"
      controls={controls}
      endpointPath="/"
      />
      </Profiler>
  );
}

export default App;
