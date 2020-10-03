import store from "../store";
import {isNotExpiryJwt} from "../helpers";

let ifNotAuthenticated = (to, from, next) => {
	// đã đăng nhập  thì ko đc go to
	if (store.getters.getIsLogin === false || !isNotExpiryJwt(localStorage.getItem('ACCESS_TOKEN'))) {
		next();
	} else {
		next({
			name: 'home',
			query: {
				direction: to.name
			}
		})
	}
};
let ifAuthenticated = (to, from, next) => {
	// yêu cầu login trước khi đến đích
	console.log(isNotExpiryJwt(localStorage.getItem('ACCESS_TOKEN')));
	if (store.getters.getIsLogin && isNotExpiryJwt(localStorage.getItem('ACCESS_TOKEN'))) {
		console.log("ifAuthenticated");
		next();
	} else {
		console.log("store.getters.getIsLogin: ", store.getters.getIsLogin);
		next({
			name: 'login',
			query: {
				direction: to.name
			}
		})
	}
};

export {
	ifNotAuthenticated, ifAuthenticated
}

