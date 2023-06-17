import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Profile from "./Profile"
import EditProfile from "./EditProfile"

const Stack = createNativeStackNavigator()
const Navigation = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
                <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation