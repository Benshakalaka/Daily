import snabbdomBundle from '../virtualDom/snabbdom.bundle'
import {VNode} from '../virtualDom/vnode';

export default class {
	private oldVnode: VNode;
	private h: Function;

	constructor (
		public name: string,
		public age: number
	) {
		this.h = snabbdomBundle.h;
	}

	initDom (container) {
		this.render(container)
	}

	addAge () {
		this.age++;
		this.render(this.oldVnode);
	}

	render (oldVnode: any) {
		return snabbdomBundle.patch(
			oldVnode || this.oldVnode,
			this.createDomTemplate()
		);
	}

	changeName (event: any) {
		this.name = event.currentTarget.value;
		this.render(this.oldVnode);
	}

	createDomTemplate () {
		const that = this;
		return that.oldVnode = that.h('div#root', [
			that.h('div.container', `Name: ${this.name} And Age: ${that.age}`),
			that.h('button', {on: {
				click: [that.addAge.bind(that)]
			}}, 'Add'),
			that.h('input', {on: {
				input: [that.changeName.bind(that)]
			}})
		]);
	}
}