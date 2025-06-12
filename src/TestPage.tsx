import { Box } from "@mui/system";
import GenericForm from "@/components.form/form.generic";

function TestPage() {
  return (
    <Box justifyContent={"center"} width={"90%"} p={5}>
      <GenericForm
        name="naas"
        controls={[{ type: "text", name: "asd", label: "Test" }]}
        endpointPath="/"
      />
    </Box>
  );
}

export default TestPage;
