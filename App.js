import { Text, View } from "react-native"
import Route from "./src/screen/Index";
import { Provider as PaperProvider } from 'react-native-paper';
const App=()=>{
  return(
    <PaperProvider>
      <Route/>
    </PaperProvider>
  )
}
export default App