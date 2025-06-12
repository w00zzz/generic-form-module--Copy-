import { Grid } from "@mui/material";
/**
 * GridContainer devuelve un contendor con un grid con propiedades pre establecidas como espaciado de 1 unidad entre los elementos y un relleno de 3 unidades en todas las direcciones.
 * @param props Este parametro especifica otras propiedades que se le pueden pasar al contenedor.
 * @param children Este parametro especifica los elementos que se van a pasar dentro del GridContainer. 
 * @returns 
 * ```ts
<GridContainer props={{justifyItems: 'center'}}>
    <Grid item xs={12}>
      <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>Elemento 1</div>
    </Grid>
    <Grid item xs={6}>
      <div style={{ backgroundColor: 'lightcoral', padding: '10px' }}>Elemento 2</div>
    </Grid>
    <Grid item xs={6}>
      <div style={{ backgroundColor: 'lightgreen', padding: '10px' }}>Elemento 3</div>
    </Grid>
</GridContainer>
 * ```
 */
export const GridContainer = ({ props, children }: any) => {
  return (
    <Grid container spacing={1} p={3}>
      {children}
    </Grid>
  );
};
