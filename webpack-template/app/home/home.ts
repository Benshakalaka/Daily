export default class {
	constructor (
		public name: string,
		public age: number
	) {}

	createEle () {
		const dom = document.createElement('div');
		dom.textContent = `Name: ${this.name} And Age: ${this.age}`;
		return dom;
	}
}