import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import OrderConfirmation from './OrderConfirm';

const Stack = createStackNavigator();

const RouteCart = () => {
  return (
      <Stack.Navigator initialRouteName="Cart">
        <Stack.Screen name="Cart" component={Cart} options={{ title: 'Giỏ hàng' }} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{ title: 'Xác nhận đơn hàng' }} />
      </Stack.Navigator>
  );
};

export default RouteCart;
