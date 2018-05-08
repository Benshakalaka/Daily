/// <reference types="node" />

import Person from './home/home'
import './assests/style/index.less'

let ben: Person = null;
if (process.env.NODE_ENV !== 'production') {
	ben = new Person('Ben', 24);
} else {
	ben = new Person('Develpment Case', 15);
}

document.querySelector("#root").appendChild(ben.createEle());