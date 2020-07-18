import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';
import AddressesReducer from './AddressesReducer';
import BranchesReducer from './BranchesReducer';
import OfferReducer from './OfferReducer';
import ProductReducer from './ProductReducer';
import getUserDatareducer from './getUserDatareducer'

export default combineReducers({
    authReducer: AuthReducer,
    cartReducer: CartReducer,
    addressReducer: AddressesReducer,
    branchesReducer: BranchesReducer,
    offersReducer: OfferReducer,
    productReducer: ProductReducer,
    getuserdataReducer: getUserDatareducer
})