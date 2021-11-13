const dev_email = Cypress.env('DEV_EMAIL');
const do_newuser = false;

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for(var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function makeemail() {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for(var i = 0; i < 10; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	var prepend = dev_email.split('@')[0] + '+' + result;
	var append = dev_email.split('@')[1];
	return prepend + '@' + append;
}

function makepw() {
	var result = '';
	var uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var lowers = 'abcdefghijklmnopqrstuvwxyz';
	var nums = '1234567890';
	var specials = '!@#$%^&*()_+';
	var uppers_length = uppers.length;
	var lowers_length = lowers.length;
	var nums_length = nums.length;
	var specials_length = specials.length;
	for(var i = 0; i < 3; i++) {
		result += uppers.charAt(Math.floor(Math.random() * uppers_length));
		result += lowers.charAt(Math.floor(Math.random() * lowers_length));
		result += nums.charAt(Math.floor(Math.random() * nums_length));
		result += specials.charAt(Math.floor(Math.random() * specials_length));
	}
	return result;
}

describe('Full test of critical functionality', () => {
	let total_token_balance = 0

	beforeEach(() => {
		cy.restoreLocalStorage()
	})

	afterEach(() => {
		cy.saveLocalStorage()
	})

	it('should load the login screen', () => {
		cy.visit('/')
		cy.contains('Sign In')
	})

	it('should login', () => {
		cy.get('input:first').clear().type(Cypress.env('ADMIN_LOGIN_EMAIL'))
		cy.get('input:last').clear()
			.type(Cypress.env('ADMIN_LOGIN_PASSWORD'))
			.type('{enter}')
	})

	it('should load dashboard', () => {
		cy.location('pathname').should('eq', '/app')
		cy.contains('Casper Token Total Balance')
		cy.wait(2000)
	})




})
