import Homepage from "./src/pages/homepage/homepage";
window.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('.container')!;
	const homepage = new Homepage();
	//@ts-ignore
	root.append(homepage.getContent());

});
