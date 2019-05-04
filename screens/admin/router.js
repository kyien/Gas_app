import React from "react";
import Dash from '../dash'
import AllSales from './salesview'
import AllExpenses from './cashview'
import SaleItem from './saleitem'
import CashItem from './cashitem'
import {createAppContainer,
    createStackNavigator} from 'react-navigation'


const Dashrouter=createStackNavigator({

    Dash:{
        screen:Dash
    },
    Sales:{
        screen:AllSales
    },
    PettyCash:{
        screen:AllExpenses
    },
    Item:{
        screen:SaleItem
    },
    CashItem:{
        screen:CashItem
    }
},
{
    headerMode: 'none'
}

)

export default createAppContainer(Dashrouter)